const express = require('express');
const {
  getDetections,
  respondToDetection,
  getDetectionStats
} = require('../controllers/detectionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getDetections);
router.get('/stats', getDetectionStats);
router.patch('/:id/respond', respondToDetection);

module.exports = router;