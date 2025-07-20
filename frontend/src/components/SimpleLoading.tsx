import React from "react";

const SimpleLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background-dark p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-accent"></div>
      <h2 className="text-xl font-semibold text-primary dark:text-accent font-sans mt-4">
        Loading...
      </h2>
    </div>
  );
};

export default SimpleLoading;
