

interface SummaryProgressBarProps {
  topic: string;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  totalQuestions: number;
  taskType?: 'quiz' | 'code';
}

const SummaryProgressBar: React.FC<SummaryProgressBarProps> = ({
  topic,
  correctAnswersCount,
  incorrectAnswersCount,
  totalQuestions,
  taskType = 'quiz',
}) => {
  const scorePercentage = totalQuestions
    ? ((correctAnswersCount / totalQuestions) * 100).toFixed(2)
    : '0';

  return (
    <div className=" p-6 font-['Roboto Mono'] font-semibold w-full">
      <h1 className="text-[50px] mb-8 text-left pt-[100px]">Summary </h1>
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-[25px] ">
          Result of {taskType === 'quiz' ? `${topic} Quiz` : `${topic} Code Challenge`}
       </p>

        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col gap-2">
          <div className="relative bg-[#C3C3C3] rounded-full h-[25px]  overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-end font-semibold text-[20px] pr-[10px]">
                {totalQuestions}
            </div>

            <div
              className="h-full bg-[#3AFF30] transition-all duration-500 ease-in-out"
              style={{ width: `${scorePercentage}%` }}> 
                <div className="absolute inset-0 flex items-center font-semibold text-[20px] pl-[10px]">
                  {correctAnswersCount}
               </div>
            
</div>
</div>
<div className="relative z-10 text-[20px] font-semibold text-right ">
              {correctAnswersCount} / {totalQuestions} Correct
            </div>
        </div>
      </div>
    </div>
   

  );
};

export default SummaryProgressBar;
