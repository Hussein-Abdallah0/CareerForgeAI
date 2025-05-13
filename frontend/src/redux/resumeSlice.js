import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  formData: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    education: [
      { institution: "", degree: "", startDate: "", endDate: "", points: ["", "", "", ""] },
    ],
    experience: [
      { company: "", position: "", startDate: "", endDate: "", points: ["", "", "", ""] },
    ],
    skills: [{ category: "Programming Languages", items: [] }],
    projects: [
      {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        points: ["", "", "", ""],
        technologies: "",
      },
    ],
  },
  summary: "",
  isLoading: false,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
});

export default resumeSlice.reducer;
