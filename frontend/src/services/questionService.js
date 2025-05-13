import axiosBaseUrl from "../../../utils/axios";

export const saveAnswer = async (questionId, answer) => {
  return axiosBaseUrl.patch(`/question/${questionId}/answer`, {
    user_answer: answer,
  });
};
