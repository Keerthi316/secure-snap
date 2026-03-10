const fs = require('fs');
const path = require('path');

exports.uploadToS3 = async (file, userId) => {
  try {
    const uploadDir = path.join(__dirname, '../../uploads', userId.toString());
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const newPath = path.join(uploadDir, file.filename);
    fs.renameSync(file.path, newPath);
    
    const relativePath = `uploads/${userId}/${file.filename}`;
    
    return {
      key: relativePath,
      url: `http://localhost:5000/${relativePath}`
    };
  } catch (error) {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw error;
  }
};

exports.getSignedUrl = (key) => {
  return `http://localhost:5000/${key}`;
};

exports.deleteFromS3 = async (key) => {
  try {
    const filePath = path.join(__dirname, '../../', key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
};