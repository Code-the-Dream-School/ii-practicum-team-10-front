import React from "react";
import { AuthenticationButtons } from "./AuthenticationButtons";

interface FormErrors {
  email?: string;
  password?: string;
}

interface Props {
  email: string;
  password: string;
  errors: FormErrors;
  isSubmitting: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}

export const LogInForm: React.FC<Props> = ({
  email,
  password,
  errors,
  isSubmitting,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pb-[30px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[55px] gap-[25px] items-center w-[90%] sm:w-[320px] md:w-[400px] lg:w-[400px]"
      >
        <div className="text-black font-[Roboto Mono] text-[40px] font-bold">Sign In</div>

        <div className="flex flex-col gap-6 items-center w-full max-w-[500px] px-4 bg-[#FFC277] py-10 rounded-2xl">
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
        </div>

        <div className="submit-container text-center mt-6">
          <AuthenticationButtons
            text="Sign In"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="transition-all duration-300"
          />
        </div>
      </form>
    </div>
  );
};
