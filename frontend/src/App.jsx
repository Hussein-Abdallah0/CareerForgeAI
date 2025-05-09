import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview/Interview";
import JobTitle from "./pages/Interview/JobTitle";
import Question from "./pages/Interview/Question";
import Result from "./pages/Interview/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interview/start" element={<JobTitle />} />
        <Route path="/interview/questions" element={<Question />} />
        <Route path="/interview/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
