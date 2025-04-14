
import React, { useState, FormEvent } from "react";
import useAuth from "../../../../hooks/useAuth"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthenticationButtons } from "./AuthenticationButtons";

export const SignUp = () => {
  const { user, register, isLoading } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  
  if (user) {
    return <Navigate to="/dashboard"/>;
  }

  const handleSignUp = async(event: FormEvent) => {
    event.preventDefault();

    if (!email || !password || !userName || !confirmedPassword) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await register(userName, email, password, confirmedPassword);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white  pb-[30px]">
      {/* Form white container */}
      <form
        onSubmit={handleSignUp}
        className="flex flex-col mt-[55px] gap-[25px] items-center w-[90%] sm:w-[320px] md:w-[400px] lg:w-[400px] h-auto bg-white "
      >
        <div className="text-black font-[Roboto Mono] text-[40px] font-bold">
          Sign Up 
        </div>

        {/* yellow container for inputs*/}
        <div className="flex flex-col gap-[25px] items-center w-full h-auto bg-[#FFC277] p-6 pt-[40px] pb-[40px] rounded-2xl">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter name"
            required
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-300 bg-[#FFFFFF] w-full sm:w-[320px] h-[70px] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-[#FFFFFF] w-full sm:w-[320px] h-[70px] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 bg-[#FFFFFF] w-full sm:w-[320px] h-[70px] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm password"
            required
            id="confirmed_password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            className="border border-gray-300 bg-[#FFFFFF] w-full sm:w-[320px] h-[70px] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="submit-container text-center mt-6">
          <AuthenticationButtons
            text="Sign Up"
            disabled={isLoading}
                    
          />
        </div>
      </form>

      {/* Forgot Password link */}
      <div className="forgot-password text-center mt-4">
        Forgot Password?{" "}
        <span className="text-blue-500 cursor-pointer"> Click here!</span>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mt-2 text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
