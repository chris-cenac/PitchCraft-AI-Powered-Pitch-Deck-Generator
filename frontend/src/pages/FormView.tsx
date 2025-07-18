import React, { useState, useEffect, useRef } from "react";
import MultiStepForm from "@/components/MultiStepForm";
import Loading from "@/components/Loading";
import type { PitchFormData } from "@/components/MultiStepForm";
import {
  createPitchDeck,
  generatePitchDeck,
  getGenerateStatus,
} from "@/api/decks";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const FormView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const simulateRef = useRef<NodeJS.Timeout | null>(null);

  // Remove convertToFormData and replace with direct payload construction
  const handleGenerate = async (pitchData: PitchFormData) => {
    setIsLoading(true);
    setError(null);
    setPhaseIndex(0);
    setProgress(0);

    try {
      console.log("Starting pitch deck creation...");

      // Construct payload as a plain object
      const payload = {
        businessData: {
          companyName: pitchData.companyName,
          tagline: pitchData.tagline,
          industry: pitchData.industry,
          businessStage: pitchData.businessStage,
          problemStatement: pitchData.problemStatement,
          targetAudience: pitchData.targetAudience,
          proposedSolution: pitchData.proposedSolution,
          revenueModel: pitchData.revenueModel,
          marketSize: pitchData.marketSize,
          competitors: pitchData.competitors,
          founders: pitchData.founders,
          visionStatement: pitchData.visionStatement,
          designStyle: pitchData.designStyle,
        },
      };

      // Create the pitch deck record
      const createRes = await createPitchDeck(payload);
      console.log("Pitch deck created:", createRes);

      const id = createRes.data._id || createRes.data.id;

      if (!id) {
        throw new Error("No ID returned from pitch deck creation");
      }

      console.log("Starting AI generation for ID:", id);

      // Kick off AI generation
      await generatePitchDeck(id);

      console.log("AI generation started, beginning status polling...");

      // Start simulation
      simulateRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 80) {
            const next = prev + 2;
            setPhaseIndex(
              next < 20 ? 0 : next < 40 ? 1 : next < 60 ? 2 : next < 80 ? 3 : 4
            );
            return next;
          }
          return prev;
        });
      }, 1000);

      // Poll for backend status
      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await getGenerateStatus(id);
          if (
            statusRes.status === "completed" ||
            (statusRes.percent ?? 0) >= 100
          ) {
            if (simulateRef.current) clearInterval(simulateRef.current);
            setProgress(100);
            setPhaseIndex(5);
            setIsLoading(false);
            clearInterval(pollRef.current!);
            navigate(`/view/${id}`);
          }
        } catch {
          if (simulateRef.current) clearInterval(simulateRef.current);
          clearInterval(pollRef.current!);
          setIsLoading(false);
          setError("Failed to check generation status. Please try again.");
        }
      }, 1000);

      // Set timeout to prevent infinite polling
      setTimeout(() => {
        clearInterval(pollRef.current!);
        if (isLoading) {
          setIsLoading(false);
          setError(
            "Generation is taking longer than expected. Please check back later."
          );
        }
      }, 300000); // 5 minutes timeout
    } catch (error) {
      if (simulateRef.current) clearInterval(simulateRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      setIsLoading(false);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (simulateRef.current) clearInterval(simulateRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  if (isLoading) {
    return <Loading currentPhaseIndex={phaseIndex} progress={progress} />;
  }

  return (
    <div className="h-screen bg-background dark:bg-background-dark overflow-hidden flex flex-col">
      {/* Header with back button */}
      <div className="flex-shrink-0 p-4 border-b border-secondary/20 dark:border-secondary-dark/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light rounded-lg hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-semibold">Create Pitch Deck</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex-shrink-0 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <strong>Error:</strong> {error}
              <button
                onClick={() => setError(null)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form content - takes remaining space */}
      <div className="flex-1 overflow-hidden">
        <MultiStepForm onSubmit={handleGenerate} />
      </div>
    </div>
  );
};

export default FormView;
