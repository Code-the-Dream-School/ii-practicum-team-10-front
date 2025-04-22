import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";

// Define the shape of a flashcard object
interface FlashcardData {
  questionId: string;
  question: string;
  answer: string;
}

// Props expected by the Flashcard component
interface FlashcardProps {
  topic: string;
  token: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ topic, token }) => {
  // State to store flashcards
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  // Current index of the flashcard being shown
  const [currentIndex, setCurrentIndex] = useState(0);
  // Whether the current flashcard is flipped
  const [flipped, setFlipped] = useState(false);
  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch flashcards from the backend
  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(
        `https://ii-practicum-team-10-back.onrender.com/api/v1/training/${topic}/flashcard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlashcards(response.data); // Store flashcards in state
    } catch (error) {
      console.error("Failed to load flashcards:", error);
    } finally {
      setLoading(false); // Set loading to false after attempt
    }
  };

  // Submit a flashcard as completed to the backend
  const submitFlashcard = async (questionId: string) => {
    try {
      await axios.post(
        `https://ii-practicum-team-10-back.onrender.com/api/v1/training/${topic}/flashcard/submit`,
        { questionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to submit flashcard:", error);
    }
  };

  // Fetch flashcards on initial render or when topic changes


  // Handler for going to the next flashcard
  const handleNext = () => {
    const current = flashcards[currentIndex];
    submitFlashcard(current.questionId); // Submit current card as completed
    setFlipped(false); // Reset flip state
    setCurrentIndex((prev) => prev + 1); // Move to next card
  };

  // Handler for going to the previous flashcard
  const handlePrevious = () => {
    setFlipped(false); // Reset flip state
    setCurrentIndex((prev) => Math.max(prev - 1, 0)); // Move back if not at start
  };

  // Show loading, empty, or finished states
  if (loading) return <p>Loading flashcards...</p>;
  if (flashcards.length === 0) return <p>No flashcards available.</p>;
  if (currentIndex >= flashcards.length) return <p>You've completed all flashcards!</p>;

  // Get the current flashcard to show
  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center">
      {/* Header with progress */}
      <h2 className="text-xl font-bold mb-4">
        Flashcard {currentIndex + 1} of {flashcards.length}
      </h2>

      {/* Flashcard container with perspective and flip logic */}
      <div
        className="relative w-96 h-48 mb-6 [perspective:1000px]"
        onClick={() => setFlipped(!flipped)} // Toggle flip on click
      >
        <div
          className={classNames(
            "absolute inset-0 rounded shadow-md transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer",
            {
              "rotate-y-180": flipped, // Apply flip class when flipped
            }
          )}
        >
          {/* Front side showing question */}
          <div className="absolute inset-0 bg-white p-6 flex items-center justify-center backface-hidden rounded">
            <p className="text-gray-800 text-lg">{currentFlashcard.question}</p>
          </div>

          {/* Back side showing answer */}
          <div className="absolute inset-0 bg-green-100 p-6 flex items-center justify-center backface-hidden rounded rotate-y-180">
            <p className="text-green-800 text-lg">{currentFlashcard.answer}</p>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        {/* Back button (if not first card) */}
        {currentIndex > 0 && (
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={handlePrevious}
          >
            Back
          </button>
        )}

        {/* Next button (only visible if card is flipped) */}
        {flipped && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
