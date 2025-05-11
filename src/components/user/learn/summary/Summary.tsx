import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  questionText: string;
  answers: string[];
}

interface CodeChallenge {
  id: string;
  challengeText: string;
  expectedOutput: string[];
}

interface LocationState {
  topic: string;
  taskType: 'quiz' | 'code';
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  totalQuestions: number;
  allQuestions: (Question | CodeChallenge)[];
  selectedAnswersHistory: string[][];
}

const Summary: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety check for state data
  if (
    !state ||
    !Array.isArray(state.allQuestions) ||
    !Array.isArray(state.selectedAnswersHistory)
  ) {
    return (
      <div className="p-[150px] text-center">
        <p className="text-2xl font-bold mb-4">Error: Summary data not available.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const {
    topic,
    taskType,
    correctAnswersCount,
    totalQuestions,
    allQuestions,
    selectedAnswersHistory,
  } = state as LocationState;

  // Check if a specific answer is correct
  const isCorrect = (i: number) => {
    const user = [...selectedAnswersHistory[i]].sort();
    const correct =
      taskType === 'quiz'
        ? [...(allQuestions[i] as Question).answers].sort()
        : [...(allQuestions[i] as CodeChallenge).expectedOutput].sort();
    return JSON.stringify(user) === JSON.stringify(correct);
  };

  return (
   
      <div className="max-w-3xl mx-auto mt-10 p-6  rounded-4xl shadow-lg  border-black border-3 bg-[#D9D9D9]">
        <h2 className="text-2xl font-bold mb-4"> Answers:
          {/* {taskType === 'quiz' ? 'Quiz Summary' : 'Code Challenge Summary'}: {topic} */}
        </h2>

        <div className="max-h-48 overflow-y-auto p-4 bg-[#D9D9D9] space-y-4 font-['Roboto Mono']  rounded-lg text-2xl font-semibold">
          {allQuestions.map((q, i) => (
            <React.Fragment key={q.id}>
              <p className="font-semibold">
                {i + 1}.{' '}
                {taskType === 'quiz'
                  ? (q as Question).questionText
                  : (q as CodeChallenge).challengeText}
              </p>
              <p className={isCorrect(i) ? 'text-green-600' : 'text-red-600'}>
                {isCorrect(i) ? 'Correct' : 'Incorrect'}: {selectedAnswersHistory[i].join(', ') || 'No answer'}
              </p>
              {!isCorrect(i) && (
                <p className="text-green-600">
                  Correct:{' '}
                  {taskType === 'quiz'
                    ? (q as Question).answers.join(', ')
                    : (q as CodeChallenge).expectedOutput.join(', ')}
                </p>
              )}
              <hr className="border-black-300"></hr>
            </React.Fragment>
          ))}
        </div>

      
      </div>
    
  );
};

export default Summary;
