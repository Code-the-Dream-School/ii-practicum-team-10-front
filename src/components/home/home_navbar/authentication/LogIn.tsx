import React, { useState, FormEvent } from "react";
import useAuth from "../../../../hooks/useAuth"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthenticationButtons } from "./AuthenticationButtons";

export const LogIn: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard"/>;
  }
  
  const handleLogIn = async (event: FormEvent) => {
    event.preventDefault();
    setError("") // reset error

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    try {
      await login(email, password)
      navigate("/dashboard") // redirect after login
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.")
    }
  }
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-white  pb-[30px]">
      {/* Form Container */}
      <form
        onSubmit={handleLogIn}
        className="flex flex-col mt-[55px] gap-[25px] items-center w-[90%] sm:w-[320px] md:w-[400px] lg:w-[400px] h-auto bg-white"
      >
        <div className="text-black font-[Roboto Mono] text-[40px] font-bold">
          Sign In
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-[20px] items-center w-full max-w-[500px] bg-[#FFC277] p-6 pt-[40px] pb-[40px] rounded-2xl">
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
        </div>

        {/* Submit Button */}
        <div className="submit-container text-center mt-6">
          <AuthenticationButtons
            text="Sign In"
            disabled={isLoading}
          />
        </div>
      </form>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mt-2 text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
};

export default LogIn;
