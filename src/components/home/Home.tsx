import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div> 
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
    </div>
 
  )
};

export default Home;
