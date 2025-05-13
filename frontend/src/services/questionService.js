import axiosBaseUrl from "../utils/axios";

export const saveAnswer = async (questionId, answer) => {
  return axiosBaseUrl.patch(`/question/${questionId}/answer`, {
    user_answer: answer,
  });
};

export const finishSession = async (sessionId, aiResponses) => {
  return axiosBaseUrl.patch(`/interview/${sessionId}/finish`, {
    ai_feedback: JSON.stringify(aiResponses),
  });
};
