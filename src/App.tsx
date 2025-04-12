import { useState, useEffect } from 'react';
import RankedUser from './components/user/leaderboard/ranking/RankedUser';
import Ranking from './components/user/leaderboard/ranking/Ranking';
import Character from './components/user/shared/Character';
import rankedUserImg from '../images/character_img.png';


function App() {
  const [rankedUsers, setRankedUsers] = useState<React.ReactElement[]>([
    <RankedUser
      key="ivan"
      userName="Ivan"
      userCharacter={<img src={rankedUserImg} className="w-16" />}
      ranking={1}
    />, 
    <RankedUser
      key="ivan"
      userName="Ivan"
      userCharacter={<img src={rankedUserImg} className="w-16" />}
      ranking={2}
    />, 
    <RankedUser
      key="ivan"
      userName="Ivan"
      userCharacter={<img src={rankedUserImg} className="w-16" />}
      ranking={3}
    />, 
    <RankedUser
      key="ivan"
      userName="Ivan"
      userCharacter={<img src={rankedUserImg} className="w-16" />}
      ranking={4}
    />, 
    <RankedUser
      key="ivan"
      userName="Ivan"
      userCharacter={<img src={rankedUserImg} className="w-16" />}
      ranking={5}
    />, 
    <RankedUser
      key="ivan"
      userName="Ivan"
      userCharacter={<img src={rankedUserImg} className="w-16" />}
      ranking={6}
    />
  ]);
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <h1>Global Ranking</h1>
      <Ranking rankedUsers={rankedUsers}/>
    </div>
  );
}

export default App
