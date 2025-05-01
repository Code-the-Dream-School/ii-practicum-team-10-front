import React, { useContext } from "react";
import Flashcard from "../../shared/Flashcard";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { getSubjectColor } from "../../../../utils/getSubjectColor";

const CssFlashcards: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return <div>Loading...</div>; //
  }

  const { user } = authContext;
  const token = localStorage.getItem("token") || "";

  return (
    <div className="p-6 mt-3">
      <h1 className="text-2xl font-bold mb-4">CSS Flashcards</h1>
      <Flashcard 
        topic="CSS" 
        token={token} 
        userId={user.userId}
        colorClass={getSubjectColor("css")} 
        />
    </div>
  );
};

export default CssFlashcards;