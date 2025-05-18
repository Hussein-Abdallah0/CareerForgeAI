import { useEffect, useRef } from "react";
import { Holistic } from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";

const MEDIAPIPE_VERSION = "0.5.1675471629";

export default function useBodyLanguageAnalysis(currentIndex, enabled = true) {
  const webcamRef = useRef(null);
  // buffer: { 0: [landmarksFrame1, landmarksFrame2, …], 1: […], … }
  const perQuestionBuffer = useRef({});

  useEffect(() => {
    // initialize buffer array for this question
    perQuestionBuffer.current[currentIndex] ||= [];

    const holistic = new Holistic({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@${MEDIAPIPE_VERSION}/${file}`,
    });
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      if (results.poseLandmarks) {
        perQuestionBuffer.current[currentIndex].push({
          timestamp: Date.now(),
          pose: results.poseLandmarks,
          face: results.faceLandmarks,
          leftHand: results.leftHandLandmarks,
          rightHand: results.rightHandLandmarks,
        });
      }
    });

    let camera = null;
    function startCamera() {
      if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState >= 2) {
        camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            // double‑check before sending
            const videoEl = webcamRef.current.video;
            if (videoEl && videoEl.readyState >= 2) {
              await holistic.send({ image: videoEl });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      } else {
        // try again in 100 ms if not ready
        setTimeout(startCamera, 100);
      }
    }

    startCamera();

    return () => {
      if (camera) camera.stop();
    };
  }, [currentIndex, enabled]);

  return { webcamRef, perQuestionBuffer };
}
