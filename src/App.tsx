import { useState, useEffect } from 'react';
import { SignUp } from './components/home/home_navbar/authentication/SignUp';
import { LogIn } from './components/home/home_navbar/authentication/LogIn';

function App() {
  return (
    <div>
      <h1>Welcome to My Vite + React + TypeScript App!</h1>
      <SignUp/>
      {/* <LogIn/> */}
    </div>
  );
}

export default App
