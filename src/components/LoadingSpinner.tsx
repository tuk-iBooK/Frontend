import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
