import React, { useState, FormEvent } from "react";
import {AuthenticationButtons} from "./AuthenticationButtons"
// import { useNavigate } from "react-router-dom"; 

export const SignUp = () => {
  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // const navigate = useNavigate();

  const url = `https://ii-practicum-team-10-back.onrender.com/api/v1/auth/register/user`;


  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validation for empty fields
    if (!email || !password || !user || !confirmedPassword) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmedPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: user,
          email: email,
          password: password,
          verifyPassword: confirmedPassword,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();

        if (response.status === 400 && responseData.message) {
          setError(responseData.message); // Show specific error message from backend
        } else {
          setError("An error occurred. Please try again.");
        }
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();

      setUser("");
      setEmail("");
      setPassword("");
      setConfirmedPassword("");
      setError("");

      // setTimeout(() => {
      //   navigate("/login"); 
      // }, 2000);

    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
            disabled={isSubmitting}
                    
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
