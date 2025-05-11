import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CodingChallengeSummary: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { classType, finalTime, route, questionId, javaScriptProgress, userCode, result } = location.state || {};

    const handleClick = () => {
        navigate(route);
    }
  
    return (
    <div className="w-[350px] sm:w-[450px] mx-auto p-6 mt-[250px] bg-white shadow rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-4">Challenge Summary</h2>
      
      <p className="text-lg mb-2">
        <span className="font-semibold">Category:</span> {classType}
      </p>
      
      <p className="text-lg mb-4">
        <span className="font-semibold">Time Taken:</span> {finalTime}
      </p>

      <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-400 hover:cursor-pointer" onClick={handleClick}>Next Question</button>
    </div>
  );
};

export default CodingChallengeSummary;
