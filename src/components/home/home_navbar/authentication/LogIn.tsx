import { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
import {AuthenticationButtons} from "./AuthenticationButtons"


export const LogIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const url = import.meta.env.VITE_API_LOGIN_URL;
  
  // const navigate = useNavigate();

  const handleLogIn = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
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
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
      const data = await response.json();
     
      localStorage.setItem("authToken", data.token); // Save token in localStorage (or cookies)

      setEmail("");
      setPassword("");
      setError("");

      // Redirect the user to the dashboard  after successful login
      // navigate("/dashboard");

      } else {
        const errorData = await response.json();
        // Handle different status codes from the backend
          if (response.status === 401) {
            setError("Invalid credentials. Please try again.");
          } else if (response.status === 400) {
            setError(errorData.message || "Please provide an email and password.");
          } else {
            setError("Something went wrong. Please try again later.");
          }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            disabled={isSubmitting}
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
  );
};
