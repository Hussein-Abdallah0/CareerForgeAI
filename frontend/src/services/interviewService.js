import axiosBase from "../utils/axios";

const AI_QS = "http://localhost:8080/generate-questions";

export default {
  createSession: (job) =>
    axiosBase.post("/interview", { job_title: job }).then((r) => r.data.payload),
  generateQuestions: (job) =>
    fetch(AI_QS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job }),
    })
      .then((r) => r.json())
      .then((j) => j.questions || []),
  storeQuestions: async (sessionId, questions) => {
    const promises = questions.map((q) =>
      axiosBase
        .post(`/interview/${sessionId}/question`, { question: q })
        .then((r) => ({ text: q, id: r.data.payload.id }))
    );
    return Promise.all(promises);
  },
};
