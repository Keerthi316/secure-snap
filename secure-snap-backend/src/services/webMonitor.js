const Image = require('../models/Image');
const Detection = require('../models/Detection');

async function simulateWebScan(userId, socketIo) {
  console.log(`🔍 Running web scan for user: ${userId}`);
  
  if (Math.random() < 0.1) {
    const userImages = await Image.find({ userId, status: 'verified' });
    
    if (userImages.length > 0) {
      const randomImage = userImages[Math.floor(Math.random() * userImages.length)];
      
      const detection = await Detection.create({
        userId,
        imageId: randomImage._id,
        website: 'https://example-social-media.com/user/12345',
        detectedImageUrl: randomImage.s3Url,
        similarityScore: 0.85,
        status: 'pending'
      });
      
      socketIo.to(userId.toString()).emit('new-detection', {
        id: detection._id,
        website: detection.website,
        imageUrl: detection.detectedImageUrl,
        timestamp: detection.detectedAt,
        status: detection.status
      });
      
      console.log(`🚨 Detection created for user: ${userId}`);
    }
  }
}

function startMonitoring(socketIo) {
  const SCAN_INTERVAL = 60 * 60 * 1000; // 1 hour
  
  setInterval(async () => {
    try {
      const User = require('../models/User');
      const users = await User.find({});
      
      for (const user of users) {
        await simulateWebScan(user._id, socketIo);
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, SCAN_INTERVAL);
  
  console.log('✅ Web monitoring started');
}

module.exports = {
  simulateWebScan,
  startMonitoring
};