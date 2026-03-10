const express = require('express');
const {
  uploadImage,
  getImages,
  getImage,
  deleteImage,
  getStats
} = require('../controllers/imageController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.use(protect);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);
router.get('/stats', getStats);
router.get('/:id', getImage);
router.delete('/:id', deleteImage);

module.exports = router;