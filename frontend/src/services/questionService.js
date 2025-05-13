import axiosBaseUrl from "../utils/axios";

export const saveAnswer = async (questionId, userText) => {
  try {
    await axiosBaseUrl.patch(`/question/${questionId}/answer`, {
      user_answer: userText,
    });
  } catch (err) {
    console.error("Failed to save answer:", err);
  }
};

export const finishSession = async (sessionId, aiResponses) => {
  try {
    await axiosBaseUrl.patch(`/interview/${sessionId}/finish`, {
      ai_feedback: JSON.stringify(aiResponses),
    });
  } catch (err) {
    console.error("Failed to finish session:", err);
  }
};
