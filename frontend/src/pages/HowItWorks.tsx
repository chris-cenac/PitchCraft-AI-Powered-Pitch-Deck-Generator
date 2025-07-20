import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaBrain,
  FaPalette,
  FaEdit,
  FaDownload,
} from "react-icons/fa";

const steps = [
  {
    title: "Tell Us About Your Business",
    icon: FaUpload,
    substeps: [
      "Enter your company name",
      "Describe your idea",
      "Add your tagline",
      "Upload your logo (optional)",
      "Select your industry and stage",
    ],
  },
  {
    title: "Our AI Gets to Work",
    icon: FaBrain,
    substeps: [
      "Analyzes your input",
      "Researches your market",
      "Plans the perfect pitch deck structure",
      "Suggests the best slide order",
    ],
  },
  {
    title: "Designing Your Slides",
    icon: FaPalette,
    substeps: [
      "Applies modern, professional design",
      "Uses your brand style",
      "Arranges content for clarity",
      "Ensures investor-ready visuals",
    ],
  },
  {
    title: "Review & Edit",
    icon: FaEdit,
    substeps: [
      "Preview your deck instantly",
      "Edit text and images",
      "Rearrange slides with drag-and-drop",
      "Make tweaks until it's perfect",
    ],
  },
  {
    title: "Download & Share!",
    icon: FaDownload,
    substeps: [
      "Export as PDF or PowerPoint",
      "Share with investors or your team",
      "Ready to impress!",
    ],
  },
];

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4">
          How PitchCraft Works
        </h1>
        <p className="text-lg text-secondary dark:text-secondary-light mb-6">
          See how easy it is to go from idea to investor-ready pitch deck:
        </p>
      </div>
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        {/* Vertical progress line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-primary/30 to-secondary/30 z-0"
          style={{ minHeight: steps.length * 180 }}
        />
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div
              key={idx}
              className="relative flex flex-col items-center w-full z-10 mb-12 last:mb-0"
            >
              {/* Step dot/number */}
              <div className="flex flex-col items-center">
                <div
                  className="bg-primary dark:bg-accent rounded-full flex items-center justify-center shadow-lg mb-2 border-4 border-white dark:border-background"
                  style={{ width: 72, height: 72 }}
                >
                  <IconComponent className="text-white w-10 h-10" />
                </div>
                <span className="text-primary dark:text-accent font-bold text-lg mb-2">
                  Step {idx + 1}
                </span>
              </div>
              {/* Card */}
              <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-xl p-8 w-full max-w-xl border border-secondary/20 dark:border-secondary-dark/20 text-center">
                <h2 className="text-2xl font-bold text-primary dark:text-accent mb-3">
                  {step.title}
                </h2>
                <ul className="text-base text-secondary dark:text-secondary-light flex flex-col gap-2">
                  {step.substeps.map((sub, subIdx) => (
                    <li
                      key={subIdx}
                      className="flex items-center gap-2 justify-center"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-primary dark:bg-accent" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Progress dot/line */}
              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-1 h-8 bg-primary/30 dark:bg-accent/30" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-12 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 text-lg font-semibold"
      >
        Back to Home
      </button>
    </div>
  );
};

export default HowItWorks;
