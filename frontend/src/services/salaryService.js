import axiosBase from "../utils/axios";
import axios from "axios";

const API_AI = "http://localhost:8080/api/salary/generate-salary";

export default {
  generate: (data) => axios.post(API_AI, data).then((r) => r.data.payload),
  saveAnalysis: (payload) =>
    axiosBase.post("/analysis", {
      job_title: payload.jobTitle,
      experience_level: payload.experience,
      location: payload.location,
      current_salary: payload.currentSalary,
      suggested_range: payload.suggestedRange,
    }),
};
