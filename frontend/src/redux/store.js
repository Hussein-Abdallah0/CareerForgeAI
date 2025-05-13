import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice";

export default configureStore({
  reducer: {
    resume: resumeReducer,
  },
});
