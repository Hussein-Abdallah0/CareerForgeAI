import { useState, useEffect } from "react";

const useQuestionFlow = (questions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionSpoken, setQuestionSpoken] = useState(false);

  const isLastQuestion = currentIndex === questions?.length - 1;

  useEffect(() => {
    if (questions?.[currentIndex]) {
      setCurrentQuestion(questions[currentIndex]);
      setQuestionSpoken(false);
    }
  }, [currentIndex, questions]);

  const goNext = () => {
    if (!isLastQuestion) setCurrentIndex((prev) => prev + 1);
  };

  return {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    goNext,
    questionSpoken,
    setQuestionSpoken,
  };
};

export default useQuestionFlow;
