import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpBar from "./ExpBar";

interface Progress {
  subject: string;
  progress: number;
}

interface DynamicSubjectProgressProps {
  userId: string;
  token: string;
}

const DynamicSubjectProgress: React.FC<DynamicSubjectProgressProps> = ({
  userId,
  token,
}) => {
  const [progressData, setProgressData] = useState<Progress[]>([]);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(
        `https://ii-practicum-team-10-back.onrender.com/api/v1/user/${userId}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Full progress response:", response.data);

      const rawProgress = response.data.progress;

      const progressArray: Progress[] = Object.entries(rawProgress).map(
        ([subject, progress]) => ({
          subject,
          progress: Number(progress),
        })
      );

      setProgressData(progressArray);
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchProgress();
    }
  }, [userId, token]);

  return (
    <div className="space-y-4">
      {progressData.map((item) => (
        <ExpBar key={item.subject} label={item.subject} value={item.progress} />
      ))}
    </div>
  );
};

export default DynamicSubjectProgress;



