import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthenticationButtons } from "./AuthenticationButtons";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please provide an email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", { email });
      setMessage(
        res.data.msg || "Password reset email sent. Please check your inbox."
      );
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400) {
          setError("Please provide an email.");
        } else if (err.response.status === 404) {
          setError("No user found with this email.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pb-[30px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[55px] gap-[25px] items-center w-[90%] sm:w-[320px] md:w-[400px] lg:w-[400px]"
      >
        <div className="text-black font-[Roboto Mono] text-[32px] md:text-[40px] font-bold">
          Forgot Password
        </div>

        <div className="flex flex-col gap-6 items-center w-full max-w-[500px] px-4 bg-[#FFC277] py-10 rounded-2xl">
          <input
            type="email"
            placeholder="Enter your email"
            id="forgot-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500 border-2" : "border-gray-300"
            }`}
          />
          {error && (
            <p className="text-red-500 font-bold text-base mt-[-15px]">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-600 font-bold text-base mt-[-15px]">
              {message}
            </p>
          )}
        </div>

        <div className="submit-container text-center mt-6">
          <AuthenticationButtons
            text="Send Reset Link"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="transition-all duration-300"
          />
        </div>

        <Link
          to="/login"
          className="text-sm text-blue-600 hover:underline mt-4"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};
