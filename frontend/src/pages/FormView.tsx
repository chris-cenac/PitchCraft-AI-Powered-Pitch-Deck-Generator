import React, { useState } from "react";
import MultiStepForm from "@/components/MultiStepForm";
import Loading from "@/components/Loading";
import type { FormData } from "@/components/MultiStepForm";

const FormView: React.FC = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async (formData: FormData) => {
    setIsLoading(true);

    await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const poll = setInterval(async () => {
      try {
        const res = await fetch("/api/generate/status");
        const { phase, percent }: { phase: number; percent: number } =
          await res.json();

        setPhaseIndex(phase);
        setProgress(percent);

        if (percent >= 100) {
          clearInterval(poll);
        }
      } catch (err) {
        console.error("Polling error", err);
        clearInterval(poll);
        setIsLoading(false);
      }
    }, 1000);
  };

  if (isLoading) {
    return <Loading currentPhaseIndex={phaseIndex} progress={progress} />;
  }

  return <MultiStepForm onSubmit={handleGenerate} />;
};

export default FormView;
