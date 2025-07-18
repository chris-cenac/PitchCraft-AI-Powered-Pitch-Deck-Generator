import React from "react";
import { useNavigate } from "react-router-dom";
import analyzing from "@/assets/illustrations/analyzing.webm";
import designing from "@/assets/illustrations/designing.webm";
import finalizing from "@/assets/illustrations/finalizing.webm";
import uploading from "@/assets/illustrations/uploading.webm";

const steps = [
  {
    title: "1. Tell Us About Your Business",
    description:
      "Fill out a simple form with details about your company, your idea, and your goals. No jargon, just your story!",
    illustration: uploading,
  },
  {
    title: "2. Our AI Gets to Work",
    description:
      "Our smart AI analyzes your info, researches your market, and plans the perfect pitch deck structure for you.",
    illustration: analyzing,
  },
  {
    title: "3. Designing Your Slides",
    description:
      "We design beautiful, modern slides that match your style and make your story shine. You don’t need any design skills!",
    illustration: designing,
  },
  {
    title: "4. Review & Edit",
    description:
      "Preview your deck, make tweaks, and rearrange slides as you like. It’s all drag-and-drop easy!",
    illustration: finalizing,
  },
  {
    title: "5. Download & Share!",
    description:
      "Export your pitch deck as PDF or PowerPoint, ready to impress investors, partners, or your team.",
    illustration: finalizing,
  },
];

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4">
          How PitchCraft Works
        </h1>
        <p className="text-lg text-secondary dark:text-secondary-light mb-6">
          Creating a stunning pitch deck is as easy as 1-2-3 (well, 5 steps!).
          Here’s how we turn your ideas into a beautiful, investor-ready
          presentation:
        </p>
      </div>
      <div className="w-full max-w-4xl grid gap-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center bg-surface dark:bg-surface-dark rounded-2xl shadow-lg p-6 md:p-10 gap-6 md:gap-10 border border-secondary/20 dark:border-secondary-dark/20"
          >
            <video
              src={step.illustration}
              autoPlay
              loop
              muted
              playsInline
              className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover shadow"
            />
            <div className="flex-1 text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-accent mb-2">
                {step.title}
              </h2>
              <p className="text-lg text-secondary dark:text-secondary-light">
                {step.description}
              </p>
            </div>
          </div>
        ))}
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
