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
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetResume: () => initialState,
  },
});

export const { setStep, updateFormData, setSummary, setLoading, resetResume } = resumeSlice.actions;
export default resumeSlice.reducer;
