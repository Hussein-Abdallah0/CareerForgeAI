import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

import Interview from "../pages/Interview/Interview";
import JobTitle from "../pages/Interview/JobTitle";
import Question from "../pages/Interview/Question";
import Result from "../pages/Interview/Result";

import Resume from "../pages/Resume/Resume";
import ResumeBuilderForm from "../pages/Resume/ResumeBuilderForm";

import Salary from "../pages/Salary/Salary";
import SalaryForm from "../pages/Salary/SalaryForm";
import SalaryResults from "../pages/Salary/SalaryResults";

import GuestLayout from "./GuestLayout";
import ProtectedLayout from "./ProtectedLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      {/* GUEST-ONLY */}
      <Route element={<GuestLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* AUTHENTICATED-ONLY */}
      <Route element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />

        {/* Interview */}
        <Route path="interview">
          <Route index element={<Interview />} />
          <Route path="start" element={<JobTitle />} />
          <Route path="questions" element={<Question />} />
          <Route path="result" element={<Result />} />
        </Route>

        {/* Resume */}
        <Route path="resume">
          <Route index element={<Resume />} />
          <Route path="form" element={<ResumeBuilderForm />} />
        </Route>

        {/* Salary */}
        <Route path="salary">
          <Route index element={<Salary />} />
          <Route path="form" element={<SalaryForm />} />
          <Route path="result" element={<SalaryResults />} />
        </Route>
      </Route>

      {/* (Optional) 404 catch-all */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
