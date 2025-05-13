import { useState } from "react";
import interviewService from "../services/interviewService";
import { useNavigate } from "react-router-dom";

export function useInterviewSession() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const start = async (job) => {
    setLoading(true);
    try {
      const session = await interviewService.createSession(job);
      const questions = await interviewService.generateQuestions(job);
      const storedQs = await interviewService.storeQuestions(session.id, questions);
      navigate("/interview/questions", { state: { questions: storedQs, sessionId: session.id } });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, start };
}
