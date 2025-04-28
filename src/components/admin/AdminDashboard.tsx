import TopicCard from "./TopicCard";
import { Navigate, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const sections = [
    { title: "HTML", color: "bg-blue-400" },
    { title: "CSS", color: "bg-purple-300" },
    { title: "JavaScript", color: "bg-orange-300" },
    { title: "NodeJS", color: "bg-green-400" },
    { title: "React", color: "bg-blue-200" },
  ];

  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen flex flex-col pt-24">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
          {sections.map(({ title, color }) => (
            <TopicCard key={title} title={title} color={color} />
          ))}
        </div>

        <div className="mt-8 w-full max-w-md">
          <button
            onClick={() => navigate("/admin-add-question")}
            className="w-full bg-black text-white text-lg py-4 rounded-lg hover:bg-green-200 hover:text-black transition"
          >
            Add Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
