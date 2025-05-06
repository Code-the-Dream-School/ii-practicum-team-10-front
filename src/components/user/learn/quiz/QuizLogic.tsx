import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  NodeJS: 'bg-green-400',
};

type AnswerStatus = 'correct' | 'incorrect' | 'completed' | null;

const QuizLogic: React.FC = () => {
  const navigate = useNavigate();
  const type = 'quiz';
  const { user, selectedClass: topic } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<AnswerStatus>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs for tracking correct/incorrect answers and progress
  const correctAnswersRef = useRef(0);
  const incorrectAnswersRef = useRef(0);

  const progressRef = useRef<Record<string, number>>({
    css: 0,
    html: 0,
    javascript: 0,
    react: 0,
    nodejs: 0,
    overall: 0,
  });

  const currentQuestion = questions[current];
  const userId = user?.userId;

  const normalizeTopicKey = (rawTopic: string): string => {
    const mapping: Record<string, string> = {
      html: 'HTML',
      css: 'CSS',
      javascript: 'JAVASCRIPT',
      react: 'REACT',
      'node.js': 'NodeJS',
      nodejs: 'NodeJS',
    };
    return mapping[rawTopic.toLowerCase()] || 'HTML';
  };

  const selectedColor = topic ? topicOptionColors[normalizeTopicKey(topic)] || 'bg-blue-400' : 'bg-blue-400';

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem('token');
      if (!topic || !token) {
        setError('Missing topic or token');
        setLoading(false);
        return;
      }

      // Normalize the topic specifically for NodeJS
      const normalizedTopic = topic === 'Node.js' ? 'NodeJS' : topic;

      try {
        const res = await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/training/${normalizedTopic}/${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        console.log('Fetched questions:', data);

        if (data.length === 0) {
          navigate('/quiz_summary', {
            state: {
              topic,
              correctAnswersCount: 0,
              incorrectAnswersCount: 0,
              totalQuestions: 0,
            },
          });
          return;
        }

        setQuestions(data.slice(0, 5));
      } catch (err) {
        console.error(err);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic, navigate]);

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

    // Update counts for correct and incorrect answers
    if (correct) {
      correctAnswersRef.current += 1;

      // Normalize topic key
      const normalizedTopic = normalizeTopicKey(topic).toLowerCase();

      // Update local cumulative progress
      if (normalizedTopic in progressRef.current) {
        progressRef.current[normalizedTopic] += 1;
      }
      progressRef.current.overall += 1;
    } else {
      incorrectAnswersRef.current += 1;
    }

    const token = localStorage.getItem('token');
    try {
      // Normalize the topic specifically for NodeJS
      const normalizedTopic = topic === 'Node.js' ? 'NodeJS' : topic;
      // Always submit the question (regardless of correct/incorrect)
      await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/training/${normalizedTopic}/${type}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ questionId: currentQuestion.id }),
      });

      //  Send  progress only when answer is correct
      if (correct) {
        await fetch(`https://ii-practicum-team-10-back.onrender.com/api/v1/user/${userId}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: progressRef.current }),
        });
      }

      // If last question, complete quiz
      if (current + 1 === questions.length) {
        setStatus('completed');
      }
    } catch (err) {
      console.error('Progress update error:', err);
    }
  };

  // If it's the last question, navigate to QuizSummaryPage
  useEffect(() => {
    if (status === 'completed') {
      navigate('/quiz_summary', {
        state: {
          topic,
          correctAnswersCount: correctAnswersRef.current,
          incorrectAnswersCount: incorrectAnswersRef.current,
          totalQuestions: questions.length,
        },
      });
    }
  }, [status, navigate, topic, questions.length]);

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

