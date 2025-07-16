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
}

const Step: React.FC<StepProps> = ({ step, title, description, completed }) => {
  return (
    <li className="mb-10 ms-6">
      <span
        className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-surface dark:ring-surface-dark ${
          completed
            ? "bg-accent dark:bg-accent-dark"
            : "bg-background dark:bg-background-dark"
        }`}
      >
        {completed ? (
          <svg
            className="w-3.5 h-3.5 text-primary dark:text-accent"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5 text-secondary dark:text-secondary-dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
          </svg>
        )}
      </span>
      <h3 className="font-medium text-primary dark:text-accent leading-tight">
        {title}
      </h3>
      <p className="text-sm text-muted dark:text-muted"> {description || ""}</p>
    </li>
  );
};

// StepperComponent.tsx
interface StepperProps {
  steps: { title: string; description?: string }[] | string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <ol className="relative text-muted border-s border-border dark:border-border dark:text-muted">
      {steps.map((step, index) => {
        // Handle both string and object formats
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
          />
        );
      })}
    </ol>
  );
};

export default Stepper;
