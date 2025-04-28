import { Navigate, useNavigate } from "react-router-dom";

interface TopicCardProps {
  title: string;
  color: string;
}

const TopicCard = ({ title, color }: TopicCardProps) => {
  const nagivate = useNavigate();
  return (
    <div
      key={title}
      className={`rounded-2xl p-20 w-70 flex flex-col items-center gap-4 ${color}`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <button
        onClick={() => {
          nagivate(`/admin-questions/${encodeURIComponent(title)}`);
        }}
        className="w-full bg-white text-black text-lg py-4 rounded-lg hover:bg-green-200 transition"
      >
        Go to Questions
      </button>
      {/* {["Flashcards", "Quiz", "Coding Challenges"].map((item) => (
        <button
          key={item}
          className="w-full bg-white text-black text-lg py-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          {item}
        </button>
      ))} */}
    </div>
  );
};

export default TopicCard;
