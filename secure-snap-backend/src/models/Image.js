const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  s3Key: {
    type: String,
    required: true
  },
  s3Url: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  faceDescriptor: {
    type: [Number],
    required: true
  },
  status: {
    type: String,
    enum: ['scanning', 'verified', 'approved', 'pending', 'rejected'],
    default: 'scanning'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

imageSchema.index({ userId: 1, uploadedAt: -1 });

module.exports = mongoose.model('Image', imageSchema);