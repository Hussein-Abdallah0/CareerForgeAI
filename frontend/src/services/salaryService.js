import axiosNode from "../utils/axiosNode";
import axiosBase from "../utils/axios";

export default {
  generate: (data) =>
    axiosNode.post("/api/salary/generate-salary", data).then((r) => r.data.payload),

  saveAnalysis: (payload) =>
    axiosBase.post("/analysis", {
      job_title: payload.jobTitle,
      experience_level: payload.experience,
      location: payload.location,
      current_salary: payload.currentSalary,
      suggested_range: payload.suggestedRange,
    }),
};
