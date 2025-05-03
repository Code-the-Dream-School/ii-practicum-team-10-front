import React from 'react';
import ProgressBar from './ProgressBar';

interface QuizRenderingProps {
  topic: string;
  currentQuestion: any;
  selectedAnswers: string[];
  status: 'correct' | 'incorrect' | null;
  questions: any[];
  loading: boolean;
  error: string | null;
  onSelectAnswer: (answer: string) => void;
  onSubmit: () => void;
  onNext: () => void;
}

const QuizRendering: React.FC<QuizRenderingProps> = ({
  topic,
  currentQuestion,
  selectedAnswers,
  status,
  questions,
  loading,
  error,
  onSelectAnswer,
  onSubmit,
  onNext,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!currentQuestion) return <p>No questions available.</p>;

  return (
    <div className="flex flex-col mt-[100px] gap-[25px] w-[80%] sm:w-[80vw] md:w-[70%] lg:w-[60%] h-auto p-6 bg-white text-center font-mono text-black">
      {topic && questions.length > 0 && (
        <ProgressBar topic={topic} completed={currentQuestion} total={questions.length} />
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
          {currentQuestion.questionSuggestedAnswers.map((option, index) => {
            const isSelected = selectedAnswers.includes(option);
            let btnColor = 'bg-blue-400'; // Default color

            if (status === 'correct' && isSelected) {
              btnColor = 'bg-green-400';
            } else if (status === 'incorrect' && isSelected) {
              btnColor = 'bg-red-400';
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectAnswer(option)}
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
          <p className="text-red-500 font-bold text-[30px]">Incorrect</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {}}
              className="w-full sm:w-40 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition text-center text-[16px] md:text-[20px] font-bold"
            >
              Try Again
            </button>

            <button
              onClick={onNext}
              className="w-full sm:w-40 px-4 py-2 rounded-full transition text-center text-[16px] md:text-[20px] font-bold bg-[#9CA3AF] hover:bg-[#6B7280]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {status === 'correct' && (
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-green-500 font-bold text-[30px]">✅ Correct!</p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onNext}
              className="w-32 bg-[#FF7789] hover:bg-[#e76874] text-black font-[Roboto] text-[16px] md:text-[20px] font-bold px-4 py-2 rounded-3xl transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizRendering;
