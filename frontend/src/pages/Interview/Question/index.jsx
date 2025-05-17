import React, { useEffect, useState } from "react";
import { ArrowRight, Keyboard, Mic } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useQuestionFlow from "../../../hooks/useQuestionFlow";
import useAnswerFlow from "../../../hooks/useAnswerFlow";
import useSessionNavigation from "../../../hooks/useSessionNavigation";
import "./styles.css";
import useBodyLanguageAnalysis from "../../../hooks/useBodyLanguageAnalysis";

const Question = () => {
  const { sessionId, questions } = useLocation().state || {};
  const [transcriptions, setTranscriptions] = useState({});
  const [aiResponses, setAiResponses] = useState({});
  const navigate = useNavigate();

  const {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    goNext,
    questionSpoken,
    setQuestionSpoken,
  } = useQuestionFlow(questions);

  const {
    isRecording,
    toggleRecording,
    showTextInput,
    toggleKeyboard,
    textAnswer,
    setTextAnswer,
    isSubmitting,
    submitText,
    transcription: lastTranscription,
    feedback: lastFeedback,
  } = useAnswerFlow(currentQuestion);

  const { webcamRef, perQuestionBuffer } = useBodyLanguageAnalysis(currentIndex);

  const recordTranscription = (text) => {
    setTranscriptions((m) => ({ ...m, [currentIndex]: text }));
  };
  const recordFeedback = (text) => {
    setAiResponses((m) => ({ ...m, [currentIndex]: text }));
  };

  const wrappedSubmitText = async () => {
    await submitText();
    if (lastTranscription) recordTranscription(lastTranscription);
    if (lastFeedback) recordFeedback(lastFeedback);
  };

  useEffect(() => {
    if (lastTranscription) recordTranscription(lastTranscription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTranscription]);

  useEffect(() => {
    if (lastFeedback) recordFeedback(lastFeedback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastFeedback]);

  const { goToResults } = useSessionNavigation(
    sessionId,
    questions,
    transcriptions,
    aiResponses,
    perQuestionBuffer.current
  );

  // Speak each question exactly once
  useEffect(() => {
    if (currentQuestion?.text && !questionSpoken) {
      import("../../../services/ttsService").then(({ speakWithOpenAITTS }) =>
        speakWithOpenAITTS(currentQuestion.text)
      );
      setQuestionSpoken(true);
    }
  }, [currentQuestion, questionSpoken, setQuestionSpoken]);

  return (
    <div className="question">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 200,
          height: 150,
          borderRadius: 8,
          border: "1px solid #888",
          zIndex: 10,
        }}
      />

      <div className="question-div">
        <div className="number">
          <p>
            {currentIndex + 1}/{questions.length}
          </p>
        </div>
        <p className="question-text">{currentQuestion?.text}</p>

        <div className="buttons">
          <div className="left-btn">
            {/* Start/stop recording */}
            <Button
              text={
                <span>
                  {isRecording ? "Stop" : "Answer"} <Mic size={24} />
                </span>
              }
              onClick={() => toggleRecording(currentQuestion?.text)}
            />

            {/*  Keyboard/text input toggle */}
            <div className="input-section">
              <button className="keyboard-btn" onClick={toggleKeyboard}>
                <Keyboard />
              </button>
            </div>
          </div>

          {/* Next or End */}
          <button className="keyboard-btn" onClick={isLastQuestion ? goToResults : goNext}>
            {isLastQuestion ? "End" : <ArrowRight />}
          </button>
        </div>
      </div>

      {/* Text input + submit */}
      {showTextInput && !lastFeedback && (
        <div className="text-input-container">
          <Input
            multiline
            label="Answer"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Type your answer..."
          />
          <Button
            text={isSubmitting ? "Submitting..." : "Submit Answer"}
            disabled={isSubmitting}
            onClick={wrappedSubmitText}
          />
        </div>
      )}

      {/* AI Feedback */}
      {lastFeedback && (
        <div className="ai-response">
          <h3>AI Feedback:</h3>
          <p>{lastFeedback}</p>
        </div>
      )}
      <div className="question-btns">
        <Button version="border" text="Return" onClick={() => navigate("/interview/start")} />
        <Button version="secondary" text="Skip" onClick={goToResults} />
      </div>
    </div>
  );
};

export default Question;
