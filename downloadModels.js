const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_URL = 'https://github.com/vladmandic/face-api/raw/master/model/';
const MODEL_DIR = path.join(__dirname, 'models');

const models = [
  'ssdMobilenetv1/ssd_mobilenetv1_model-weights_manifest.json',
  'ssdMobilenetv1/ssd_mobilenetv1_model-shard1',
  'faceLandmark68Net/face_landmark_68_model-weights_manifest.json',
  'faceLandmark68Net/face_landmark_68_model-shard1',
  'faceRecognitionNet/face_recognition_model-weights_manifest.json',
  'faceRecognitionNet/face_recognition_model-shard1',
  'faceRecognitionNet/face_recognition_model-shard2'
];

if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadModels() {
  console.log('Downloading face-api models...');
  
  for (const model of models) {
    const url = MODEL_URL + model;
    const dest = path.join(MODEL_DIR, model);
    
    // Create subdirectory if needed
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    console.log(`Downloading ${model}...`);
    await downloadFile(url, dest);
  }
  
  console.log('✅ All models downloaded successfully!');
}

downloadModels().catch(console.error);