import { useLocation } from 'react-router-dom';

const QuizSummaryPage = () => {
  const { state } = useLocation();
  const { topic,  correctAnswersCount, incorrectAnswersCount, totalQuestions } = state || {};

  // Calculate the percentage score for correct answers
  const scorePercentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);

return(

  <div className=" min-h-screen p-6 font-['Roboto Mono'] font-semibold">
    <h1 className="text-[50px] mb-8 text-left p-[100px]">Summary</h1>
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-[25px] text-left">Result of {topic} quiz</p>
        <div className="w-full sm:w-1/2 md:w-1/2  flex flex-col gap-2">
          <div className="relative bg-[#C3C3C3] rounded-full h-[25px]">
            
            <div className="absolute inset-0 flex items-center justify-end font-semibold text-[20px] pr-[10px]">
                {totalQuestions}
            </div>

              {/* Progress fill */}
            <div
                className="h-full rounded-full bg-[#3AFF30]"
                style={{ width: `${scorePercentage}%` }}
            />

            <div className="absolute inset-0 flex items-center justify-center font-semibold text-[20px]">
                {correctAnswersCount}
            </div>
          </div>

            <div className="text-[20px] font-semibold text-right">
              {correctAnswersCount} / {totalQuestions} Correct
            </div>
          </div>
        </div>
      </div>
    );
  };

export default QuizSummaryPage;
