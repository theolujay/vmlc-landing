import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './ui/Button';
import { loadFaceDetectionModels, detectFace } from '../utils/faceDetection';

interface FacialCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
}

const FacialCaptureModal: React.FC<FacialCaptureModalProps> = ({ isOpen, onClose, onConfirm }) => {
  // useRef allows us to access actual DOM elements directly.
  // We need this for <video> and <canvas> to control playback and drawing, 
  // which React's declarative model doesn't handle directly.
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  // Face Detection State
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initModels = async () => {
      await loadFaceDetectionModels();
      setIsModelLoading(false);
    };
    initModels();
  }, []);

  // Effect to handle camera start/stop when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      startCamera();
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      stopCamera();
      document.body.style.overflow = 'unset';
    }
    return () => {
        stopCamera();
        document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !capturedImage && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      startFaceDetection();
    } else {
        stopFaceDetection();
    }
  }, [isOpen, capturedImage, stream]);

  const startFaceDetection = () => {
    if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
    
    detectionIntervalRef.current = setInterval(async () => {
        if (videoRef.current && videoRef.current.readyState === 4) { // HAVE_ENOUGH_DATA
            const detected = await detectFace(videoRef.current);
            setIsFaceDetected(detected);
        }
    }, 500); // Check every 500ms
  };

  const stopFaceDetection = () => {
    if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
    }
    setIsFaceDetected(false);
  };

  const startCamera = async () => {
    setCapturedImage(null);
    setError('');
    setIsCapturing(true);

    // Feature detection for browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera API is not supported on this device or browser. Please try a different device.');
        setIsCapturing(false);
        return;
    }

    try {
      // Accessing the camera hardware (requires permission from user)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }, // Request front-facing camera
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream; // Connect stream to video element
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setError('Camera access denied. Please allow camera permissions in your browser settings to continue.');
    } finally {
        setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    stopFaceDetection();
    if (stream) {
      // Stop all tracks (video/audio) to release the hardware
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d'); // Get 2D drawing context

      if (context) {
        // Match canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas content to a base64 Data URL (image/jpeg)
        const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageUrl);
        stopFaceDetection();
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
        // Convert Data URL back to Blob/File for upload
        fetch(capturedImage)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "face_capture.jpg", { type: "image/jpeg" });
                
                if (file.size > 5 * 1024 * 1024) {
                    setError("Image is too large (max 5MB). Please retake.");
                    return;
                }
                
                onConfirm(file);
                onClose();
            });
    }
  };

  if (!isOpen) return null;

  // createPortal renders this component's HTML outside the parent component's DOM hierarchy.
  // It appends it directly to document.body.
  // This is crucial for modals to ensure they float above everything else (z-index) and aren't clipped by parent containers.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 -z-10" onClick={onClose} />
      
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 flex flex-col">
        {!error ? (
           <>
             {!capturedImage ? (
                <div className="space-y-6">
                    <div className={`relative aspect-square max-w-[280px] mx-auto bg-gray-100 rounded-full overflow-hidden border-4 flex items-center justify-center shadow-inner transition-colors duration-300 ${
                        isFaceDetected ? 'border-green-500' : 'border-gray-300 border-dashed'
                    }`}>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover transform scale-x-[-1]" 
                            muted
                        />
                         {isCapturing && <div className="absolute inset-0 flex items-center justify-center bg-white/50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div></div>}
                         
                         {/* Face Detection Status Indicator */}
                         {!isModelLoading && !isCapturing && (
                             <div className={`absolute bottom-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-all duration-300 ${
                                 isFaceDetected 
                                    ? 'bg-green-100 text-green-700 opacity-90' 
                                    : 'bg-yellow-100 text-yellow-700 opacity-90 animate-pulse'
                             }`}>
                                 {isFaceDetected ? 'Face Detected' : 'Position Face in Circle'}
                             </div>
                         )}
                         {isModelLoading && (
                             <div className="absolute top-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold opacity-90">
                                 Loading AI...
                             </div>
                         )}
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800">
                        <p className="font-semibold mb-1">Instructions:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Ensure good lighting on your face</li>
                            <li>Remove face coverings (glasses/masks) if possible</li>
                            <li>Face the camera directly</li>
                        </ul>
                    </div>

                    <div className="flex justify-center space-x-4">
                         <Button variant="ghost" onClick={onClose}>Cancel</Button>
                         <Button 
                            onClick={handleCapture} 
                            disabled={isCapturing || isModelLoading || !isFaceDetected}
                            className={`${!isFaceDetected ? 'opacity-50 cursor-not-allowed' : ''}`}
                         >
                            Capture Photo
                         </Button>
                    </div>
                </div>
             ) : (
                <div className="space-y-6">
                    <div className="relative aspect-square max-w-[280px] mx-auto bg-gray-100 rounded-full overflow-hidden border-2 border-brand-blue shadow-lg">
                         <img src={capturedImage} alt="Captured" className="w-full h-full object-cover transform scale-x-[-1]" />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
                        <Button variant="ghost" onClick={handleRetake}>Retake Photo</Button>
                        <Button onClick={handleConfirm}>Confirm & Use Photo</Button>
                    </div>
                </div>
             )}
           </>
        ) : (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Camera Error</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                 <Button onClick={startCamera} variant="outline" className="text-brand-blue border-brand-blue hover:bg-blue-50">Try Again</Button>
                 <div className="mt-4">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                 </div>
            </div>
        )}
        
        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>,
    document.body
  );
};

export default FacialCaptureModal;