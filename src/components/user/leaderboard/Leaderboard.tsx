import React from 'react';
import { useState, useEffect } from 'react';
import RankedUser from './ranking/RankedUser';
import Ranking from './ranking/Ranking';
import UserCharacterSummary from './UserCharacterSummary';
import { useAuth } from '../../globally_shared/AuthContext';

const Leaderboard: React.FC = () => {
    const { user, token } = useAuth();
    const [rankedUsers, setRankedUsers] = useState<React.ReactElement[]>([]);
    
    const url = import.meta.env.VITE_API_TOP_USERS_URL;
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
        }
      }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <UserCharacterSummary/>
            <Ranking rankedUsers={rankedUsers}/>
        </div>
    
    )
}

export default Leaderboard