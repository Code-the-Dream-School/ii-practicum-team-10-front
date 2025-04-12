import React from "react";

interface AuthenticationButtonsProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  className?: string; 
}

export const AuthenticationButtons: React.FC<AuthenticationButtonsProps> = ({ text, onClick, disabled, className = "" }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#D9D9D9] text-black font-[Roboto Mono] text-[40px] font-bold p-3 rounded-2xl  sm:w-[175px] md:w-[225px] lg:w-[275px] h-[74px] flex items-center justify-center ${className}`}
    >
      {text}
    </button>
  );
};
