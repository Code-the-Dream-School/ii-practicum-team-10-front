import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  profilePicture: string;
}

const Character: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch("https://ii-practicum-team-10-back.onrender.com/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: "alex@gmail.com",
            password: "secret"
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        setProfilePicture(data.user.profilePicture);
      } catch (error) {
        console.error("Image loading error:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  if (!profilePicture) return <p>Loading image...</p>;

  return (
    <div className="flex justify-center mt-4">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-24 h-24 object-cover"
      />
    </div>
  );
};

export default Character;
