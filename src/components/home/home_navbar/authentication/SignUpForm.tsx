
import React from "react";
import { AuthenticationButtons } from "./AuthenticationButtons";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmedPassword?: string;
}

interface Props {
  user: string;
  email: string;
  password: string;
  confirmedPassword: string;
  errors: FormErrors;
  isSubmitting: boolean;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmedPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}

export const SignUpForm: React.FC<Props> = ({
  user,
  email,
  password,
  confirmedPassword,
  errors,
  isSubmitting,
  setUser,
  setEmail,
  setPassword,
  setConfirmedPassword,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pb-[30px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[55px] gap-[25px] items-center w-[90%] sm:w-[320px] md:w-[400px] lg:w-[400px]"
      >
        <div className="text-black font-[Roboto Mono] text-[40px] font-bold">Sign Up</div>

        <div className="flex flex-col gap-6 items-center w-full max-w-[500px] px-4 bg-[#FFC277] py-10 rounded-2xl">
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={`border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500 border-2" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 font-bold text-base mt-1">{errors.name}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500 border-2" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 font-bold text-base mt-1">{errors.email}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500 border-2" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 font-bold text-base mt-1">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm password"
            id="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            className={`border w-[90%] h-[70px] p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmedPassword ? "border-red-500 border-2" : "border-gray-300"
            }`}
          />
          {errors.confirmedPassword && (
            <p className="text-red-500 font-bold text-base mt-1">{errors.confirmedPassword}</p>
          )}
        </div>

        <div className="submit-container text-center mt-6">
          <AuthenticationButtons
            text="Sign Up"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="transition-all duration-300"
          />
        </div>
      </form>

      <div className="forgot-password text-center mt-4">
        Forgot Password?{" "}
        <span className="text-blue-500 cursor-pointer"> Click here!</span>
      </div>
    </div>
  );
};
