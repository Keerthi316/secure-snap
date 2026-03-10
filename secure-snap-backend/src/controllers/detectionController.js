const Detection = require('../models/Detection');
const Image = require('../models/Image');
const { getSignedUrl } = require('../services/s3Service');

exports.getDetections = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { userId: req.user.id };

    if (status && status !== 'all') {
      query.status = status;
    }

    const detections = await Detection.find(query)
      .populate('imageId')
      .sort({ detectedAt: -1 });

    const detectionsWithUrls = detections.map(det => ({
      id: det._id,
      website: det.website,
      imageUrl: det.imageId ? getSignedUrl(det.imageId.s3Key) : null,
      similarityScore: det.similarityScore,
      status: det.status,
      detectedAt: det.detectedAt,
      respondedAt: det.respondedAt
    }));

    res.status(200).json({
      success: true,
      count: detections.length,
      detections: detectionsWithUrls
    });
  } catch (error) {
    console.error('Get detections error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching detections'
    });
  }
};

exports.respondToDetection = async (req, res) => {
  try {
    const { action } = req.body;

    if (!['approved', 'denied'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "approved" or "denied"'
      });
    }

    const detection = await Detection.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: 'Detection not found'
      });
    }

    detection.status = action;
    detection.respondedAt = new Date();
    await detection.save();

    if (action === 'denied') {
      console.log(`🚫 Takedown request sent for: ${detection.website}`);
    }

    res.status(200).json({
      success: true,
      message: `Detection ${action}`,
      detection: {
        id: detection._id,
        status: detection.status,
        respondedAt: detection.respondedAt
      }
    });
  } catch (error) {
    console.error('Respond to detection error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error responding to detection'
    });
  }
};

exports.getDetectionStats = async (req, res) => {
  try {
    const stats = await Detection.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statsObj = {
      total: 0,
      pending: 0,
      approved: 0,
      denied: 0
    };

    stats.forEach(stat => {
      statsObj[stat._id] = stat.count;
      statsObj.total += stat.count;
    });

    res.status(200).json({
      success: true,
      stats: statsObj
    });
  } catch (error) {
    console.error('Get detection stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching detection statistics'
    });
  }
};