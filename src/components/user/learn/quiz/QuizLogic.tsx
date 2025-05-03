
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import QuizUI from './QuizUI';

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
  NODEJS: 'bg-green-400',
};

type AnswerStatus = 'correct' | 'incorrect' | 'completed'| null;

const QuizLogic: React.FC = () => {
  const type = 'quiz';
  const { user, selectedClass: topic } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<AnswerStatus>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[current];
  const userId = user?.userId;

  const selectedColor = topic ? topicOptionColors[topic.toUpperCase()] || 'bg-blue-400' : 'bg-blue-400';
  // const cleanedTopic = topic?.replace(/[^a-zA-Z]/g, '').toUpperCase(); // "Node.js" → "NODEJS"
  // const selectedColor = cleanedTopic ? topicOptionColors[cleanedTopic] || 'bg-blue-400' : 'bg-blue-400';
  
  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem('token');
      if (!topic || !token) {
        setError('Missing topic or token');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/training/${topic}/${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        console.log('Fetched questions:', data);
        setQuestions(data.slice(0, 5));
      } catch (err) {
        console.error(err);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleSelect = (answer: string) => {
    if (status) return;
    setSelectedAnswers((prev) =>
      prev.includes(answer) ? prev.filter((a) => a !== answer) : [...prev, answer]
    );
  };

  const isAnswerCorrect = (): boolean => {
    const correct = [...currentQuestion.answers].sort();
    const selected = [...selectedAnswers].sort();
    return correct.length === selected.length && correct.every((val, i) => val === selected[i]);
  };

  const handleSubmit = async () => {
    const correct = isAnswerCorrect();
    setStatus(correct ? 'correct' : 'incorrect');

    if (correct) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/training/${topic}/${type}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questionId: currentQuestion.id }),
        });

        const progressUpdate: Record<string, number> = {
          css: 0,
          html: 0,
          javaScript: 0,
          react: 0,
          nodejs: 0,
          overall: 1,
        };

        const normalizedTopic = topic?.toLowerCase();
        if (normalizedTopic && progressUpdate.hasOwnProperty(normalizedTopic)) {
          progressUpdate[normalizedTopic] = 1;
        }


        await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/user/${userId}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: progressUpdate }),
        });
        if (current + 1 === questions.length) {
          // If it's the last question, handle the end of the quiz
          setStatus('completed'); // or you can use 'correct' here if you prefer
        }

      } catch (err) {
        console.error('Progress update error:', err);
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

  if (!user) return <p>You must be logged in to take the quiz.</p>;
  if (loading) return <p>Loading...</p>;
  if (error || !questions.length) return <p>{error || 'No questions found.'}</p>;

  return (
    <QuizUI
      currentQuestion={currentQuestion}
      topic={topic}
      questionsLength={questions.length}
      current={current}
      selectedAnswers={selectedAnswers}
      status={status}
      selectedColor={selectedColor}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
      onTryAgain={handleTryAgain}
      onSkip={handleSkip}
      onNext={handleNext}
    />
  );
};

export default QuizLogic;
