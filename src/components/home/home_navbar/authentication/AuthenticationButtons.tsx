import React from "react";

interface AuthenticationButtonsProps {
  text: string;
  // onClick: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
  disabled: boolean;
  className?: string; 
}

export const AuthenticationButtons: React.FC<AuthenticationButtonsProps> = ({ text, onClick, disabled, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-black font-[Roboto Mono] text-[40px] font-bold p-3 rounded-4xl  sm:w-[175px] md:w-[225px] lg:w-[275px] h-[74px] flex items-center justify-center ${disabled ? "bg-[#38FF2E]" : "bg-[#D9D9D9]"} ${className}`}
    >
      {text}
    </button>
  );
};
