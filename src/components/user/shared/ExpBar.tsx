import React from "react";

interface ExpBarProps {
  label: string;
  value: number;
}

const ExpBar: React.FC<ExpBarProps> = ({ label, value }) => {
  return (
    <div>
      <label className="block font-medium mb-1 capitalize">{label}</label>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{value}%</p>
    </div>
  );
};

export default ExpBar;

