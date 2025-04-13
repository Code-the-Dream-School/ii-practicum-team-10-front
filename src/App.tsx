import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./components/home/Home";
import { LogIn } from "./components/home/home_navbar/authentication/LogIn";
import { SignUp } from "./components/home/home_navbar/authentication/SignUp";
// import { Dashboard } from "./components/user/dashboard/Dashboard";
// import { Learn } from "./components/user/learn/Learn";
import Leaderboard from "./components/user/leaderboard/Leaderboard";
// import { NotFound } from "./components/";
// import { Navbar } from "./components/user/navbar/Navbar";
import { AuthProvider } from './components/globally_shared/AuthContext';


const App: React.FC = () => {

  return (
  <>
    <AuthProvider>
      <BrowserRouter>
      <nav>
        {/* <Navbar/> */}
      </nav>
        <Routes>
          {/* <Route path = "/" element = {<Leaderboard />} /> */}
          <Route path = "/" element = {<Home />} />
          <Route path ="signup" element = {<SignUp />} />
          <Route path ="login" element = {<LogIn />} />
          <Route path ="leaderboard" element = {<Leaderboard />} />
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
    </AuthProvider>
  </>
 
  );
}

export default App
