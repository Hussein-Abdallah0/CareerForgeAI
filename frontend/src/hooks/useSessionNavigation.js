import { useNavigate } from "react-router-dom";
import { finishSession } from "../services/questionService";

export default function useSessionNavigation(sessionId, questions, transcriptionsMap, feedbackMap) {
  const navigate = useNavigate();

  const goToResults = async () => {
    //  Build arrays (one element per question), filling blanks where needed
    const userResponses = questions.map((_, idx) => transcriptionsMap[idx] || "");
    const aiFeedback = questions.map((_, idx) => feedbackMap[idx] || "");

    // Send the array of feedback to your backend
    await finishSession(sessionId, aiFeedback);

    // Navigate, passing arrays
    navigate("/interview/result", {
      state: {
        questions: questions.map((q) => q.text),
        userResponses,
        aiFeedback,
        sessionId,
      },
    });
  };

  return { goToResults };
}
