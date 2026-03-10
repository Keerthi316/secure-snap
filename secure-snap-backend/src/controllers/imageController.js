const Image = require('../models/Image');
const { detectFace } = require('../services/faceRecognition');
const { uploadToS3, deleteFromS3, getSignedUrl } = require('../services/s3Service');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    console.log('Processing image upload:', req.file.originalname);

    let faceDescriptor;
    try {
      faceDescriptor = await detectFace(req.file.path);
    } catch (faceError) {
      console.error('Face detection failed:', faceError);
      return res.status(400).json({
        success: false,
        message: 'No face detected in image. Please upload a clear photo with a visible face.'
      });
    }

    const s3Data = await uploadToS3(req.file, req.user.id);

    const image = await Image.create({
      userId: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      s3Key: s3Data.key,
      s3Url: s3Data.url,
      size: req.file.size,
      mimeType: req.file.mimetype,
      faceDescriptor,
      status: 'scanning'
    });

    setTimeout(async () => {
      try {
        image.status = 'verified';
        await image.save();
        console.log('Image verified:', image._id);
      } catch (err) {
        console.error('Error updating image status:', err);
      }
    }, 2000);

    res.status(201).json({
      success: true,
      image: {
        id: image._id,
        url: getSignedUrl(image.s3Key),
        name: image.originalName,
        status: image.status,
        uploadedAt: image.uploadedAt,
        size: image.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading image'
    });
  }
};

exports.getImages = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = { userId: req.user.id };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.originalName = { $regex: search, $options: 'i' };
    }

    const images = await Image.find(query).sort({ uploadedAt: -1 });

    const imagesWithUrls = images.map(img => ({
      id: img._id,
      url: getSignedUrl(img.s3Key),
      name: img.originalName,
      status: img.status,
      uploadedAt: img.uploadedAt,
      size: img.size
    }));

    res.status(200).json({
      success: true,
      count: images.length,
      images: imagesWithUrls
    });
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching images'
    });
  }
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.status(200).json({
      success: true,
      image: {
        id: image._id,
        url: getSignedUrl(image.s3Key),
        name: image.originalName,
        status: image.status,
        uploadedAt: image.uploadedAt,
        size: image.size
      }
    });
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching image'
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    await deleteFromS3(image.s3Key);
    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting image'
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Image.aggregate([
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
      approved: 0,
      pending: 0,
      rejected: 0,
      scanning: 0,
      verified: 0
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
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching statistics'
    });
  }
};