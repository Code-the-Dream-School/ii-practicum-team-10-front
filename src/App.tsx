import { useState, useEffect } from 'react';
import RankedUser from './components/user/leaderboard/ranking/RankedUser';
import Ranking from './components/user/leaderboard/ranking/Ranking';
import rankedUserImg from '../images/character_img.png';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Navbar } from "./components/user/navbar/Navbar";
import { Home } from "./components/home/Home";
import { LogIn } from "./components/home/home_navbar/authentication/LogIn";
import { SignUp } from "./components/home/home_navbar/authentication/SignUp";
// import { Dashboard } from "./components/user/dashboard/Dashboard";
// import { Learn } from "./components/user/learn/Learn";
// import { Leaderboard } from "./components/user/leaderboard/Leaderboard";
// import { NotFound } from "./components/";


const App: React.FC = () => {

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
  ])

  return (
  <>
    <BrowserRouter>
    <nav>
      {/* <Navbar/> */}
    </nav>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path ="signup" element = {<SignUp />} />
        <Route path ="login" element = {<LogIn />} />
        {/* <Route path ="dashboard" element = {<Dashboard />} />
        <Route path ="/learn" element = {<Learn />} >
          <Route path ="htmlpage" element = {<Html />} />
          <Route path ="csspage" element = {<Css />} />
          <Route path ="javascriptpage" element = {<Javascript />} /> */}
        {/* </Route>
        <Route path ="leaderboard" element = {<Leaderboard />} />
        <Route path ="*" element = {<NotFound />} /> */}

      </Routes>
    </BrowserRouter>
  </>
 
  );
}

export default App
