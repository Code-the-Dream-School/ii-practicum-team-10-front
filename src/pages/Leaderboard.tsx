import React from 'react';
import { useState, useEffect } from 'react';
import RankedUser from '../components/user/leaderboard/ranking/RankedUser';
import Ranking from '../components/user/leaderboard/ranking/Ranking';
import UserCharacterSummary from '../components/user/leaderboard/UserCharacterSummary';
import useAuth from "../hooks/useAuth"

const Leaderboard: React.FC = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");
    const [rankedUsers, setRankedUsers] = useState<React.ReactElement[]>([]);
    const [cssScore, setCssScore] = useState<number>();
    const [htmlScore, setHtmlScore] = useState<number>();
    const [javaScriptScore, setJavaScriptScore] = useState<number>();
    const [nodeJsScore, setNodeJsScore] = useState<number>();
    const [reactScore, setReactScore] = useState<number>();
    const [overallScore, setOverallScore] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);
    
    const url = import.meta.env.VITE_API_TOP_USERS_URL;
    const userProgressUrl = `https://ii-practicum-team-10-back.onrender.com/api/v1/user/${user?.userId}/progress`;
    const backendServerUrl = import.meta.env.VITE_API_SERVER;

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

            type TopUser = {
              name: string;
              overallProgress: number
              profilePicture: string;
            };

            const topUsers = data.map((topUser: TopUser, index: number) => {
              console.log("TYPE", typeof(topUser))
                const userPfp = backendServerUrl + topUser.profilePicture;
                return(
                    <RankedUser 
                        key={index} 
                        userName={topUser.name} 
                        userCharacter={<img src={`${userPfp}`} className="w-13" />} 
                        ranking={index + 1}
                    />
                )
            })
            setRankedUsers(topUsers);
            setIsLoading(false);
            console.log("SUCESSFUL DATA", data);
        } catch {
            throw console.error();
            
        }
    }

    // useEffect()
    
    useEffect(() => {
        if (token) {
          fetchTopTenUsers();
          fetchUserProgress();
        }
      }, [token]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen md:flex-row">
            <UserCharacterSummary cssScore={cssScore} htmlScore={htmlScore} javaScriptScore={javaScriptScore} nodeJsScore={nodeJsScore} reactScore={reactScore} overallScore={overallScore}/>
            {isLoading ? <div className='flex justify-center items-center w-90'><p className='font-semibold text-3xl'>Loading ...</p></div> : <Ranking rankedUsers={rankedUsers}/>}
        </div>
    
    )
}

export default Leaderboard