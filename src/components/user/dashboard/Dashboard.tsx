
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DynamicSubjectProgress from "../shared/DynamicSubjectProgress";
import Character from "../shared/Character";
import ExpBar from "../shared/ExpBar";

interface User {
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  userId: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const fetchOverallProgress = async () => {
      if (!user || !token) return;
      try {
        const response = await axios.get(
          `https://ii-practicum-team-10-back.onrender.com/api/v1/user/${user.userId}/progress`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOverallProgress(Number(response.data.progress.overall));
      } catch (error) {
        console.error("Failed to fetch overall progress:", error);
      }
    };

    fetchOverallProgress();
  }, [user, token]);

  if (!user || !token) return <p>Loading Dashboard...</p>;

  const imageUrl = `https://ii-practicum-team-10-back.onrender.com${user.profilePicture.replace("/public", "")}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  mt-24 min-h-screen bg-gray-100 p-8 gap-4">
      <div className="flex flex-col">
        <h1 className="text-3xl italic font-serif mb-4">Welcome, {user.name}!</h1>

        <div>
        <button
            onClick={() => navigate("/learn")}
            className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Go to Learn
          </button>
        </div>

        {overallProgress !== null && (
          <div className="mb-6">            
            <ExpBar label="Overall" value={overallProgress} />
          </div>
        )}




        <Character src={user.profilePicture} alt="Profile" />
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <DynamicSubjectProgress userId={user.userId} token={token} />
      </div>
    </div>
  );
};

export default Dashboard;




