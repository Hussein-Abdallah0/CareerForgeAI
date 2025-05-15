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
    skills: [
      {
        category: "Programming Languages",
        items: [
          { name: "JavaScript", level: "Intermediate" },
          { name: "Python", level: "Beginner" },
        ],
      },
    ],
    jobDescription: "",
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      state.step -= 1;
    },
    updateField(state, action) {
      const { path, value } = action.payload;
      let cursor = state.formData;
      for (let i = 0; i < path.length - 1; i++) {
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = value;
    },
    addArrayItem(state, action) {
      const { key, template } = action.payload;
      state.formData[key].push(template);
    },
    removeArrayItem(state, action) {
      const { key, index } = action.payload;
      state.formData[key].splice(index, 1);
    },
    replaceDraftData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { nextStep, prevStep, updateField, addArrayItem, removeArrayItem, replaceDraftData } =
  resumeSlice.actions;

export default resumeSlice.reducer;
