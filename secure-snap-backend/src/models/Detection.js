const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  website: {
    type: String,
    required: true
  },
  detectedImageUrl: {
    type: String,
    required: true
  },
  similarityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  },
  detectedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  }
});

detectionSchema.index({ userId: 1, status: 1, detectedAt: -1 });

module.exports = mongoose.model('Detection', detectionSchema);