import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import ExpBar from "./ExpBar";
import { getSubjectColor } from "../../../utils/getSubjectColor";
import { calculateOverallProgress } from "../../../utils/calculateOverallProgress";


interface FlashcardData {
  questionId: string;
  question: string;
  answer: string;
}

interface FlashcardProps {
  topic: string;
  userId: string;
  token?: string;
  colorClass?: string;
}

//Normalize topic names to match what Swagger expects
const normalizeTopic = (rawTopic: string): string => {
  const map: Record<string, string> = {
    css: "CSS",
    html: "HTML",
    javascript: "JavaScript",
    react: "React",
    nodejs: "NodeJS",
  };
  return map[rawTopic.toLowerCase()] || rawTopic;
};

// const normalizeTopic = (rawTopic: string): string => {
//     return rawTopic.toLowerCase(); // Always return lowercase
//   };


// Axios instance
const api = axios.create({
  baseURL: "https://ii-practicum-team-10-back.onrender.com/api/v1/",
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const Flashcard: React.FC<FlashcardProps> = ({ topic, userId, colorClass }) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);

  const normalizedTopic = normalizeTopic(topic);

  const fetchFlashcards = async () => {
    try {
      const response = await api.get(`training/${normalizedTopic}/flashcard`);
      setFlashcards(
        response.data.map((item: any) => ({
          questionId: item.id,
          question: item.questionText,
          answer: item.answers[0] || "No answer provided",
        }))
      );
    } catch (error) {
      console.error("Failed to load flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitFlashcard = async (questionId: string) => {
    try {
      const payload = {
        questionId,
        userId,
        topic: normalizedTopic,
      };
      await api.post(`training/${normalizedTopic}/flashcard/submit`, payload);
    } catch (error) {
      console.error("Failed to submit flashcard:", error);
    }
  };

  const updateProgress = async (progressValue: number) => {
    try {
      const newProgress = { [normalizedTopic]: progressValue }; // Update only the current topic
        console.log("New progress payload:", newProgress);
      const { data } = await api.get(`user/${userId}/progress`);
      const currentProgress = data.progress || {};
       console.log("Current progress:", currentProgress);

       const deNormolizedTopic = (rawTopic: string): string => {
        const map: Record<string, string> = {
          CSS: "css",
          HTML: "html",
          JAVASCRIPT: "javaScript",
          REACT: "react",
          NODEJS: "nodejs",
        };
        return map[rawTopic.toUpperCase()] || rawTopic;
      };
    
        const deNormalizedTopic = deNormolizedTopic(normalizedTopic);
        newProgress[deNormalizedTopic] = progressValue; // Update the de-normalized topic name
      const updatedProgress = {
        ...currentProgress,
        ...newProgress,
      };
  
      updatedProgress["overall"] = calculateOverallProgress(updatedProgress);
  
      console.log("Updating progress with payload:", updatedProgress);
  
      await api.post(`user/${userId}/progress`, {
        progress: updatedProgress,
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };
  
  

  

  useEffect(() => {
    fetchFlashcards();
  }, [topic]);

  const handleNext = async () => {
    const current = flashcards[currentIndex];
    await submitFlashcard(current.questionId);
    const newCompletedCount = completedCount + 1;
    setCompletedCount(newCompletedCount);
    const newProgress = Math.round((newCompletedCount / flashcards.length) * 100);
    await updateProgress(newProgress);
    setFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) return <p className="m-6">Loading flashcards...</p>;
  if (flashcards.length === 0) return <p className="m-6">No flashcards available.</p>;
  if (currentIndex >= flashcards.length) return  <div className="max-w-3xl mx-auto mt-10 p-6 rounded-4xl shadow-lg  border-black border-3 bg-[#D9D9D9]"><p className="text-lg items-center" >You completed {completedCount} flashcards on {topic}.</p> </div>

  const currentFlashcard = flashcards[currentIndex];
  const progressValue = Math.round((completedCount / flashcards.length) * 100);
  const effectiveColor = colorClass || getSubjectColor(topic);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">
        Flashcard {currentIndex + 1} of {flashcards.length}
      </h2>

      <div
        className="relative w-96 h-48 mb-6 [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={classNames(
            "absolute inset-0 rounded shadow-md transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer",
            {
              "rotate-y-180": flipped,
            }
          )}
        >
          <div className={classNames(
            "absolute inset-0 p-6 flex items-center justify-center backface-hidden rounded-2xl", effectiveColor)}>
            <p className="text-white text-lg">{currentFlashcard.question}</p>
          </div>
          <div className="absolute inset-0 bg-green-100 p-6 flex items-center justify-center backface-hidden rounded rotate-y-180">
            <p className="text-green-800 text-lg">{currentFlashcard.answer}</p>
          </div>
        </div>
      </div>

      <div className="w-96 mb-4">
        <ExpBar label={normalizedTopic} value={progressValue} />
      </div>

      <div className="flex gap-4">
        {currentIndex > 0 && (
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={handlePrevious}
          >
            Back
          </button>
        )}

        {flipped && (
          <button
            className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;

