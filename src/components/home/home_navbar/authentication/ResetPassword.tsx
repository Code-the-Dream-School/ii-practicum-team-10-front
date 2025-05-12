import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { AuthenticationButtons } from "./AuthenticationButtons";

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !token || !password || !verifyPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(token);
      const response = await axios.post(
        "https://ii-practicum-team-10-back.onrender.com/api/v1/auth/reset-password",
        {
          email,
          token,
          password,
          verifyPassword,
        }
      );

      setSuccessMsg(response.data.msg);
    } catch (err: any) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An unexpected error occurred.");
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
        <div className="text-black font-[Roboto Mono] text-[30px] sm:text-[35px] font-bold">
          Reset Password
        </div>

        <div className="flex flex-col gap-6 items-center w-full max-w-[500px] px-4 bg-[#FFC277] py-10 rounded-2xl">
          <p className="text-sm text-gray-700 w-[90%] text-left">
            Resetting password for: <strong>{email}</strong>
          </p>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          />

          {error && <p className="text-red-600 font-bold text-base">{error}</p>}
          {successMsg && (
            <p className="text-green-600 font-bold text-base">{successMsg}</p>
          )}
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline mt-4"
          >
            Back to Login
          </Link>
        </div>

        <div className="submit-container text-center mt-6">
          <AuthenticationButtons
            text="Reset Password"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="transition-all duration-300"
          />
        </div>
      </form>
    </div>
  );
};
