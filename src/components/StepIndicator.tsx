// StepIndicator.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 추적
  const steps = ["장르", "배경", "시대", "등장인물", "줄거리"];
  const pageRoutes = [
    "/genre",
    "/background",
    "/period",
    "/character",
    "/summary",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepIndex = pageRoutes.indexOf(location.pathname);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [location]); // location이 변경될 때마다 effect가 실행됩니다.

  const handleStepClick = (index: number) => {
    navigate(pageRoutes[index]);
  };

  return (
    <div className="flex w-3/4">
      <div className="flex justify-start rounded-t-2xl bg-[#EBEBEB] mt-16 text-xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`px-8 py-4 cursor-pointer ${
              index === currentStep
                ? "bg-[#FFF0A3] text-black font-bold rounded-t-2xl"
                : "text-gray-500"
            }`}
            onClick={() => handleStepClick(index)}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
