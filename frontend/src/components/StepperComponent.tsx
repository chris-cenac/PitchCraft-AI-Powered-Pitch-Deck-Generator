import React from "react";

interface StepData {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: StepData[];
  currentStep: number;
}

interface StepProps {
  step: number;
  title: string;
  description?: string;
  completed: boolean;
  isCurrent: boolean;
  isLast: boolean;
}

const Step: React.FC<StepProps> = ({
  step,
  title,
  description,
  completed,
  isCurrent,
  isLast,
}) => {
  return (
    <div className="flex items-start space-x-3">
      {/* Step Circle */}
      <div className="flex-shrink-0 relative">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            completed
              ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
              : isCurrent
              ? "bg-gradient-to-r from-primary to-secondary shadow-lg ring-4 ring-primary/20"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {completed ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <span
              className={`text-sm font-semibold ${
                isCurrent ? "text-white" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {step}
            </span>
          )}
        </div>

        {/* Connecting Line */}
        {!isLast && (
          <div
            className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-12 transition-all duration-500 ${
              completed
                ? "bg-gradient-to-b from-green-500 to-emerald-500"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        )}
      </div>

      {/* Step Content */}
      <div className="flex-1 pt-1 pb-6">
        <h3
          className={`text-base font-semibold transition-colors duration-200 ${
            completed
              ? "text-green-600 dark:text-green-400"
              : isCurrent
              ? "text-primary dark:text-accent"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {title}
        </h3>
        {description && (
          <p
            className={`text-xs mt-1 transition-colors duration-200 ${
              completed
                ? "text-green-500 dark:text-green-300"
                : isCurrent
                ? "text-secondary dark:text-secondary-light"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {description}
          </p>
        )}

        {/* Progress indicator for current step */}
        {isCurrent && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-1 rounded-full animate-pulse"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="space-y-2">
        {steps.map((step, index) => {
          const title = typeof step === "string" ? step : step.title;
          const description =
            typeof step === "string" ? "" : step.description || "";

          return (
            <Step
              key={index}
              step={index + 1}
              title={title}
              description={description}
              completed={index < currentStep}
              isCurrent={index === currentStep - 1}
              isLast={index === steps.length - 1}
            />
          );
        })}
      </div>

      {/* Overall progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stepper;
