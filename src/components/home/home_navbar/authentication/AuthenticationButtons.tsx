import React from "react";

interface AuthenticationButtonsProps {
  text: string;
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
      className={`
        text-black font-[Roboto Mono] text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-bold 
        w-full max-w-[240px] h-[74px] flex items-center justify-center p-3 rounded-4xl
        ${disabled ? "bg-[#38FF2E]" : "bg-[#D9D9D9]"} 
        ${disabled ? "" : "shadow-lg hover:shadow-[0px_8px_15px_4px_rgba(0,0,0,0.2)] hover:bg-[#FFC277] transform hover:scale-105 transition-all duration-300"}
        ${className}`}>
      {text}
    </button>
  );
};
