import * as faceapi from '@vladmandic/face-api';

// Configuration for the Tiny Face Detector
// Increased inputSize to 320 for better accuracy (was 224).
// Lowered scoreThreshold to 0.3 to be more forgiving (was 0.5).
const DETECTOR_OPTIONS = new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.3 });

let isModelLoaded = false;

export const loadFaceDetectionModels = async () => {
  if (isModelLoaded) return;

  try {
    console.log('Loading face detection models from /models ...');
    // Load model from public/models
    // Note: The path is relative to the root of the deployed site
    await faceapi.nets.tinyFaceDetector.load('/models');
    isModelLoaded = true;
    console.log('Face detection models loaded successfully');
  } catch (error) {
    console.error('Failed to load face detection models:', error);
    // Explicitly check for 404 or other network errors in the console log
  }
};

export const detectFace = async (videoElement: HTMLVideoElement): Promise<boolean> => {
  if (!isModelLoaded) {
    return false;
  }
  
  if (!videoElement || videoElement.paused || videoElement.ended || videoElement.readyState < 2) {
    return false;
  }

  try {
    const result = await faceapi.detectSingleFace(videoElement, DETECTOR_OPTIONS);
    if (result) {
        // console.log('Face detected with score:', result.score);
    }
    return !!result;
  } catch (error) {
    console.error('Error during face detection:', error);
    return false;
  }
};