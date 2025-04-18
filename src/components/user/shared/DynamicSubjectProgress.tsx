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
  hideOverall?: boolean;
}



const DynamicSubjectProgress: React.FC<DynamicSubjectProgressProps> = ({
  userId,
  token,
  hideOverall,
}) => {
  const [subjectProgress, setSubjectProgress] = useState<Progress[]>([]);
  const [overallProgress, setOverallProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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

      const rawProgress = response.data.progress;

      const formattedProgress: Progress[] = Object.entries(rawProgress)
      .filter(([subject]) => !(hideOverall && subject === "overall"))
      .map(([subject, value]) => ({
        subject,
        progress: Number(value),
      }));

      setSubjectProgress(formattedProgress);
      setOverallProgress(Number(rawProgress.overall));
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchProgress();
    }
  }, [userId, token]);

  if (loading) return <p>Loading progress...</p>;

  const hasProgress =
    (overallProgress !== null && overallProgress > 0) ||
    subjectProgress.some((subject) => subject.progress > 0);
  console.log(subjectProgress)
  return (
    <div>
      {!hasProgress ? (
        <p className="text-green-500 text-2xl italic">
          You haven’t started learning yet.
        </p>
      ) : (
        subjectProgress
            .filter((subject) => subject.subject.toLowerCase() !== "overall") // Exclude        "Overall"
            .map((subject) => (
       <div id={subject.subject} key={subject.subject} className="mb-4">
      <ExpBar label={subject.subject} value={subject.progress} />
    </div>
  ))
      )}
    </div>
  );
};

export default DynamicSubjectProgress;
