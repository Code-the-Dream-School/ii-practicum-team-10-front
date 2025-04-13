import React from 'react';
import { useState, useEffect } from 'react';
import RankedUser from './ranking/RankedUser';
import Ranking from './ranking/Ranking';
import UserCharacterSummary from './UserCharacterSummary';
import { useAuth } from '../../globally_shared/AuthContext';

const Leaderboard: React.FC = () => {
    const { user, token } = useAuth();
    const [rankedUsers, setRankedUsers] = useState<React.ReactElement[]>([]);
    const [cssScore, setCssScore] = useState<number>();
    const [htmlScore, setHtmlScore] = useState<number>();
    const [javaScriptScore, setJavaScriptScore] = useState<number>();
    const [nodeJsScore, setNodeJsScore] = useState<number>();
    const [reactScore, setReactScore] = useState<number>();
    const [overallScore, setOverallScore] = useState<number>();
    
    const url = import.meta.env.VITE_API_TOP_USERS_URL;
    const userProgressUrl = `https://ii-practicum-team-10-back.onrender.com/api/v1/user/${user?.userId}/progress`;

    const fetchUserProgress = async () => {
        try {
            const response = await fetch(userProgressUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json();
            console.log("USER PROGRESS", data)

            setCssScore(data.progress.css);
            setHtmlScore(data.progress.html);
            setJavaScriptScore(data.progress.javaScript);
            setNodeJsScore(data.progress.nodejs);
            setReactScore(data.progress.react);
            setOverallScore(data.progress.overall);
        } catch {
            throw console.error();
            
        }
    }

    const fetchTopTenUsers = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            const topUsers = data.map((topUser, index) => {
                return(
                    <RankedUser 
                        key={index} 
                        userName={topUser.name} 
                        userCharacter={<img src="images/character_img.png" className="w-16" />} 
                        ranking={index + 1}
                    />
                )
            })
            setRankedUsers(topUsers);
            console.log("SUCESSFUL DATA", data);
        } catch {
            throw console.error();
            
        }
    }
    
    useEffect(() => {
        if (token) {
          fetchTopTenUsers();
          fetchUserProgress();
        }
      }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <UserCharacterSummary cssScore={cssScore} htmlScore={htmlScore} javaScriptScore={javaScriptScore} nodeJsScore={nodeJsScore} reactScore={reactScore} overallScore={overallScore}/>
            <Ranking rankedUsers={rankedUsers}/>
        </div>
    
    )
}

export default Leaderboard