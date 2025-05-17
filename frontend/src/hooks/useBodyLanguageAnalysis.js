import { useEffect, useRef } from "react";
import { Holistic } from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera-utils";

export default function useBodyLanguageAnalysis(currentIndex) {
  const webcamRef = useRef(null);
  // buffer: { 0: [landmarksFrame1, landmarksFrame2, …], 1: […], … }
  const perQuestionBuffer = useRef({});

  useEffect(() => {
    // initialize buffer array for this question
    perQuestionBuffer.current[currentIndex] ||= [];

    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
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
    if (webcamRef.current?.video) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => camera && camera.stop();
  }, [currentIndex]);

  return { webcamRef, perQuestionBuffer };
}
