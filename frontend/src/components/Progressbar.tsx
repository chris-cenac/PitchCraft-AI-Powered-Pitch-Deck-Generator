import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-in-ou"
        style={{ width: `${progress}%` }}
      >
        {/* Percentage removed from inside the bar */}
      </div>
    </div>
    <div className="mt-1 text-sm font-semibold text-primary dark:text-accent">
      {Math.round(progress)}%
    </div>
  </div>
);

export default ProgressBar;
