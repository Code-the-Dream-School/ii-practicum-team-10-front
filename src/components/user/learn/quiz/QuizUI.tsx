// QuizUI.tsx
import React from 'react';
import ProgressBar from './ProgressBar';

interface QuizUIProps {
  currentQuestion: any;
  topic: string;
  questionsLength: number;
  current: number;
  selectedAnswers: string[];
  status: string | null;
  selectedColor: string;
  onSelect: (answer: string) => void;
  onSubmit: () => void;
  onTryAgain: () => void;
  onSkip: () => void;
  onNext: () => void;
}

const QuizUI: React.FC<QuizUIProps> = ({
  currentQuestion,
  topic,
  questionsLength,
  current,
  selectedAnswers,
  status,
  selectedColor,
  onSelect,
  onSubmit,
  onTryAgain,
  onSkip,
  onNext,
}) => {
  if (!currentQuestion) return <p>Loading question...</p>;

  return (
    <div className="flex flex-col mt-[100px] gap-[25px] w-[80%] sm:w-[80vw] md:w-[70%] lg:w-[60%] h-auto p-6 bg-white text-center font-mono text-black">
      {topic && (
        <ProgressBar topic={topic} completed={current} total={questionsLength} />
      )}
   {status === 'completed' && (
        <div className="success-message">
          <p className="text-green-500  font-[Roboto Mono] font-bold text-[30px]"> You've completed the quiz!</p>
          {/* Maybe show updated progress or move to next quiz */}
        </div>
      )}

      <h2 className="text-black font-[Roboto Mono] text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-bold">
        {currentQuestion.questionText}
      </h2>

      {currentQuestion.codeSnippet && (
        <pre className="bg-gray-100 p-4 rounded-lg text-left overflow-x-auto text-sm sm:text-lg md:text-xl lg:text-2xl">
          <code>{currentQuestion.codeSnippet}</code>
        </pre>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="flex flex-col space-y-3 mt-4">
          {currentQuestion.questionSuggestedAnswers.map((option: string, index: number) => {
            const isSelected = selectedAnswers.includes(option);
            const isCorrect = currentQuestion.answers.includes(option);
            let btnColor = selectedColor;

            if (status === 'correct' && isSelected && isCorrect) {
              btnColor = "bg-green-400";
            } else if (status === 'incorrect') {
              if (isSelected && isCorrect) btnColor = "bg-green-400";
              else if (isSelected && !isCorrect) btnColor = "bg-red-400";
              else if (!isSelected && isCorrect) btnColor = selectedColor;
            } else if (isSelected) {
              btnColor = "bg-[#FF3F42]";
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelect(option)}
                className={`${btnColor} px-4 py-2 rounded-3xl text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300`}
                disabled={status !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        {status === null && (
          <button
            type="submit"
            className="mt-6 px-6 py-2 rounded-3xl bg-[#FFC277] text-black text-[16px] md:text-[20px] font-bold hover:bg-[#38FF2E] transition w-32"
            disabled={selectedAnswers.length === 0}
          >
            Submit
          </button>
        )}
      </form>

      {status === 'incorrect' && (
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-red-500 font-bold text-[30px]">Incorrect </p>
          <div className="flex justify-center gap-4">
            <button onClick={onTryAgain} className="w-full sm:w-40 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition text-[16px] md:text-[20px] font-bold">
              Try Again
            </button>
            <button onClick={onSkip} className="w-full sm:w-40 px-4 py-2 rounded-full bg-[#9CA3AF] hover:bg-[#6B7280] transition text-[16px] md:text-[20px] font-bold">
              Skip
            </button>
          </div>
        </div>
      )}

      {status === 'correct' && (
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-green-500 font-bold text-[30px]">✅ Correct!</p>
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={onNext} className="w-32 bg-[#FF7789] hover:bg-[#e76874] text-black font-[Roboto] text-[16px] md:text-[20px] font-bold px-4 py-2 rounded-3xl transition">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizUI;
