import { useNavigate } from "react-router-dom";
import { finishSession } from "../services/questionService";
import axiosNode from "../utils/axiosNode";

function summarizeBodyMetrics(frames) {
  if (!frames?.length) return null;

  let sumSh = 0,
    sumWl = 0,
    sumWr = 0,
    moves = 0;
  let lastWl = null,
    lastWr = null;

  frames.forEach((f) => {
    const sh = (f.pose[11].y + f.pose[12].y) / 2;
    sumSh += sh;

    const wl = f.pose[15].y;
    const wr = f.pose[19].y;
    sumWl += wl;
    sumWr += wr;

    if (lastWl !== null) {
      if (Math.abs(wl - lastWl) > 0.02 || Math.abs(wr - lastWr) > 0.02) {
        moves++;
      }
    }
    lastWl = wl;
    lastWr = wr;
  });

  const n = frames.length;
  return {
    avgShoulderY: sumSh / n,
    avgLeftWristY: sumWl / n,
    avgRightWristY: sumWr / n,
    handMovementCount: moves,
  };
}

export default function useSessionNavigation(
  sessionId,
  questions,
  transcriptionsMap,
  feedbackMap,
  perQuestionBuffer,
  videoEnabled
) {
  const navigate = useNavigate();

  const goToResults = async () => {
    // 1) Build speech feedback arrays
    const userResponses = questions.map((_, i) => transcriptionsMap[i] || "");
    const aiSpeechFeedback = questions.map((_, i) => feedbackMap[i] || "");

    // 2) Summarize body metrics, but only keep real data
    //    If summarizeBodyMetrics(...) returns null → skip below
    const allMetrics = questions.map((_, i) => summarizeBodyMetrics(perQuestionBuffer[i]));

    // 3) Persist speech feedback as before
    await finishSession(sessionId, aiSpeechFeedback);

    // 4) Extract only the non‐null metrics to send to backend
    const payloadMetrics = allMetrics.filter((m) => m !== null);

    // 5) Fetch tips for only the answered questions
    //    Our Node route still expects `{ bodyMetrics: [ ... ] }`
    const { data } = await axiosNode.post("/api/body-language", {
      bodyMetrics: payloadMetrics,
    });
    const tipsForAnswered = Array.isArray(data.tips) ? data.tips : [];

    // 6) Reconstruct full‑length array, inserting "" for skipped questions
    const bodyLanguageFeedback = [];
    let tipIndex = 0;
    allMetrics.forEach((m) => {
      if (m === null) {
        bodyLanguageFeedback.push(""); // no tip for unanswered
      } else {
        bodyLanguageFeedback.push(tipsForAnswered[tipIndex++] || "");
      }
    });

    // 7) Navigate, passing everything along
    navigate("/interview/result", {
      state: {
        questions: questions.map((q) => q.text),
        userResponses,
        aiFeedback: aiSpeechFeedback,
        bodyLanguageFeedback,
        videoEnabled,
      },
    });
  };

  return { goToResults };
}
