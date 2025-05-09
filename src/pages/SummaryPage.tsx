import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Summary from '../components/user/learn/summary/Summary';
import SummaryProgressBar from '../components/user/learn/summary/SummaryProgressBar';

const SummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (!state) {
      navigate('/dashboard', { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null; // Prevent rendering if redirect is happening
  // if (!state) {
  //   return (
  //     <div className="text-center pt-20">
  //       <p className="text-xl font-semibold">Summary data is missing.</p>
  //       <button
  //         onClick={() => navigate('/dashboard')}
  //         className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //       >
  //         Return to Dashboard
  //       </button>
  //     </div>
  //   );
  // }

  const {
    topic,
    taskType,
    correctAnswersCount,
    incorrectAnswersCount,
    totalQuestions,
    allQuestions,
    selectedAnswersHistory,
  } = state;

  return (
    <div className="flex flex-col items-center  justify-center gap-[20px] p-[30px]">
      <SummaryProgressBar
        topic={topic}
        taskType={taskType}
        correctAnswersCount={correctAnswersCount}
        incorrectAnswersCount={incorrectAnswersCount}
        totalQuestions={totalQuestions}
      />
      <Summary />
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 px-4 py-2  bg-[#77B7FF] text-black rounded-full hover:bg-[#38FF2E]"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default SummaryPage;
