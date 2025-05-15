import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import Interview from "./pages/Interview/Interview";
import JobTitle from "./pages/Interview/JobTitle";
import Question from "./pages/Interview/Question";
import Result from "./pages/Interview/Result";

import Resume from "./pages/Resume/Resume";
import ResumeBuilderForm from "./pages/Resume/ResumeBuilderForm";

import Salary from "./pages/Salary/Salary";
import SalaryForm from "./pages/Salary/SalaryForm";
import SalaryResults from "./pages/Salary/SalaryResults";

import GuestLayout from "./routes/GuestLayout";
import ProtectedLayout from "./routes/ProtectedLayout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
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

            {/* nested Interview routes */}
            <Route path="interview">
              <Route index element={<Interview />} />
              <Route path="start" element={<JobTitle />} />
              <Route path="questions" element={<Question />} />
              <Route path="result" element={<Result />} />
            </Route>

            {/* nested Resume routes */}
            <Route path="resume">
              <Route index element={<Resume />} />
              <Route path="form" element={<ResumeBuilderForm />} />
            </Route>

            {/* nested Salary routes */}
            <Route path="salary">
              <Route index element={<Salary />} />
              <Route path="form" element={<SalaryForm />} />
              <Route path="result" element={<SalaryResults />} />
            </Route>
          </Route>

          {/* you can add a catch-all 404 here if you like */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
