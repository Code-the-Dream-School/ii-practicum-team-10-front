import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../../contexts/AuthProvider';
import useAuth from '../../../../hooks/useAuth'; 
import ProgressBar from './ProgressBar';


interface Question {
  id: string;
  questionText: string;
  codeSnippet?: string;
  questionSuggestedAnswers: string[];
  answers: string[];
}

const topicOptionColors: Record<string, string> = {
  HTML: 'bg-blue-400',
  CSS: 'bg-purple-400',
  JAVASCRIPT: 'bg-yellow-300',
  REACT: 'bg-orange-400',
  nodejs: 'bg-green-400',

};

type AnswerStatus = 'correct' | 'incorrect' | null;

const Quiz: React.FC = () => {
  const type = "quiz";
  const { user, selectedClass: topic, } = useAuth();

  if (!user) {
    return <p>You must be logged in to take the quiz.</p>;
  }
  const userId = user.userId; 

  const selectedColor = topic
    ? topicOptionColors[topic.toUpperCase()] || 'bg-blue-400'
    : 'bg-blue-400';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<AnswerStatus>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[current];

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem('token');

      if (!topic) {
        setError('Topic is not defined.');
        setLoading(false);
        return;
      }

      if (!token) {
        setError('You are not logged in. Please log in to continue.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://ii-practicum-team-10-back.onrender.com/api/v1/training/${topic}/${type}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch questions');

        const data: Question[] = await res.json();
        setQuestions(data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Error loading quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (topic && type) fetchQuestions();
  }, [topic, type]);

  const handleSelect = (answer: string) => {
    if (status) return;
    setSelectedAnswers((prev) =>
      prev.includes(answer) ? prev.filter((a) => a !== answer) : [...prev, answer]
    );
  };

  const isAnswerCorrect = (): boolean => {
    const correct = [...currentQuestion.answers].sort();
    const selected = [...selectedAnswers].sort();
    return correct.length === selected.length && correct.every((val, idx) => val === selected[idx]);
  };

  const handleSubmit = async () => {
    const correct = isAnswerCorrect();
    setStatus(correct ? 'correct' : 'incorrect');

    if (correct) {
      
      try {
      const token = localStorage.getItem('token');

        await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/training/${topic}/${type}/submit`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
           },
        
          body: JSON.stringify({ questionId: currentQuestion.id }),
        });

        await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/user/${userId}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
          // progress: {
          //   css: 50,
          //   html: 10,
          //   javaScript: 10,
          //   react: 10,
          //   nodejs: 10,
          //   overall: 10,
          // },
          progress: {
            css: 0,
            html: 0,
            javaScript: 0,
            react: 0,
            nodejs: 0,
            overall: 0,
          },
        }),
      })
  
      } catch (err) {
        console.error('Error submitting progress:', err);
      }
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswers([]);
    setStatus(null);
  };

  const handleSkip = () => {
    setSelectedAnswers([]);
    setStatus(null);
    setCurrent((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelectedAnswers([]);
    setStatus(null);
    setCurrent((prev) => prev + 1);
  };

  if (loading || !currentQuestion) return <p>Loading...</p>;
  if (!questions.length) return <p>No questions available.</p>;

  return (
    <div className="flex flex-col mt-[100px] gap-[25px] w-[80%] sm:w-[80vw] md:w-[70%] lg:w-[60%] h-auto p-6 bg-white text-center font-mono text-black">
      {topic && questions.length > 0 && (
        <ProgressBar topic={topic} completed={current} total={questions.length} />
      )}

      <h2 className="text-black font-[Roboto Mono] text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-bold">
        {currentQuestion.questionText}
      </h2>

      {currentQuestion.codeSnippet && (
        <pre className="bg-gray-100 p-4 rounded-lg text-left overflow-x-auto text-sm sm:text-lg md:text-xl lg:text-2xl">
          <code>{currentQuestion.codeSnippet}</code>
        </pre>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="flex flex-col space-y-3 mt-4">
          {currentQuestion.questionSuggestedAnswers.map((option, index) => {
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
                onClick={() => handleSelect(option)}
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
            <button
              onClick={handleTryAgain}
              className="w-full sm:w-40 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition text-center text-[16px] md:text-[20px] font-bold"
            >
              Try Again
            </button>

            <button
              onClick={handleSkip}
              className="w-full sm:w-40 px-4 py-2 rounded-full transition text-center text-[16px] md:text-[20px] font-bold bg-[#9CA3AF] hover:bg-[#6B7280]"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {status === 'correct' && (
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-green-500 font-bold text-[30px]">✅ Correct!</p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleNext}
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

export default Quiz;
