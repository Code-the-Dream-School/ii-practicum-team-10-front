import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


export const Modal: React.FC <ModalProps> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;
    
  return (
    <div 
      className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50" 
      onClick = {onClose}>
      <div 
        className="relative bg-white  shadow-lg p-6 rounded-lg w-full max-w-lg" 
        onClick = {(e) => e.stopPropagation()}>
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
          </svg>
        </button>

      {children}
      </div>
    </div>
  )
}