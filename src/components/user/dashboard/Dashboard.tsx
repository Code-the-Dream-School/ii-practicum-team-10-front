import React from "react";
import { useNavigate } from "react-router-dom";
import DynamicSubjectProgress from "../shared/DynamicSubjectProgress";
import Character from "../shared/Character";
import { useEffect, useState } from "react";
import axios from "axios";



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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "https://ii-practicum-team-10-back.onrender.com/api/v1/auth/login",
          {
            email: "alex@gmail.com",
            password: "secret",
          }
        );

        console.log("Fetched user data:", response.data.user);

        setUser(response.data.user);
        setToken(response.data.token);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user || !token) return <p>Loading Dashboard...</p>;

  return (
    <div className="grid grid-cols-2 justify-around min-h-screen bg-gray-100 p-8 gap-4">
      <div className="flex flex-col justify-around">
        <h1 className="text-3xl italic font-serif mb-4">
          Welcome, {user.name}!
        </h1>

<div className="flex justify-center mb-8">
  <button
    onClick={() => navigate("/learn")}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Go to Learn
  </button>
</div>

    <Character src={user.profilePicture} alt="Profile" />


        
      </div>

      <div className="flex flex-col justify-around">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <DynamicSubjectProgress userId={user.userId} token={token} />
      </div>
    </div>
  );
};

export default Dashboard;






