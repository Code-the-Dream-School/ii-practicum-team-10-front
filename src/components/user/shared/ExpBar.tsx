import React from "react";
import classNames from "classnames";

interface ExpBarProps {
  label: string;
  value: number;
  color?: string;
}

const subjectColors: { [key: string]: string } = {
  css: "bg-indigo-500",
  html: "bg-red-400",
  javascript: "bg-yellow-400",
  react: "bg-sky-400",
  nodejs: "bg-emerald-500",
  default: "bg-gray-400",
};

const ExpBar: React.FC<ExpBarProps> = ({ label, value, color }) => {
  const barColor = color || subjectColors[label.toLowerCase()] || subjectColors.default;

  return (
    <div>
      {/* Label of subject */}
      <h4 className="text-md font-semibold mb-1 text-gray-700 capitalize">
        {label}
      </h4>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
        <div
          className={classNames(barColor, "h-4 rounded transition-all duration-700")}
          style={{ width: `${value}%` }}
        />
      </div>

      {/* Value of exp */}
      <p className="text-sm text-gray-600 mt-1">{value}/100 exp</p>
    </div>
  );
};

export default ExpBar;


