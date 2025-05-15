import axiosNode from "../utils/axiosNode";
import axiosBase from "../utils/axios";

export default {
  createSession: (job) =>
    axiosBase.post("/interview", { job_title: job }).then((r) => r.data.payload),

  generateQuestions: (job) =>
    axiosNode.post("/generate-questions", { job }).then((r) => r.data.questions || []),

  storeQuestions: async (sessionId, questions) => {
    const promises = questions.map((q) =>
      axiosBase
        .post(`/interview/${sessionId}/question`, { question: q })
        .then((r) => ({ text: q, id: r.data.payload.id }))
    );
    return Promise.all(promises);
  },
};
