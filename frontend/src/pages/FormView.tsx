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
import { toast } from "react-hot-toast";
import { handleAuthError } from "@/utils/authInterceptor";

const TEST_FORM_DATA = {
  companyName: "TestTech Solutions",
  tagline: "Innovating Tomorrow, Today",
  industry: "FinTech",
  businessStage: "Growth",
  problemStatement:
    "Small businesses struggle to access affordable financial analytics tools.",
  targetAudience: "Small business owners, startups, and entrepreneurs",
  proposedSolution:
    "A cloud-based platform offering real-time, AI-driven financial insights.",
  uniqueValueProposition:
    "First to offer predictive analytics tailored for SMBs at a low monthly cost.",
  revenueModel: "Subscription-based with tiered pricing",
  marketSize: "$10B TAM, $1B SAM",
  competitors: "QuickBooks, Xero, FreshBooks",
  pricingStrategy: "Freemium with paid advanced features",
  goToMarketStrategy:
    "Partner with local banks and run targeted digital campaigns.",
  founders: "Jane Doe (CEO), John Smith (CTO), Alice Lee (CFO)",
  teamSize: "18",
  visionStatement:
    "Empower every small business to make data-driven decisions.",
  longTermGoals:
    "Expand globally, integrate with major POS systems, reach 100k users by 2027.",
  designStyle: "Minimal",
  logoUrl: "",
};

const FormView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const simulateRef = useRef<NodeJS.Timeout | null>(null);
  const [autofillData, setAutofillData] = useState<PitchFormData | undefined>(
    undefined
  );

  // Remove convertToFormData and replace with direct payload construction
  const handleGenerate = async (pitchData: PitchFormData) => {
    setIsLoading(true);
    setError(null);
    setPhaseIndex(0);
    setProgress(0);

    try {
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
          uniqueValueProposition: pitchData.uniqueValueProposition,
          revenueModel: pitchData.revenueModel,
          marketSize: pitchData.marketSize,
          competitors: pitchData.competitors,
          pricingStrategy: pitchData.pricingStrategy,
          goToMarketStrategy: pitchData.goToMarketStrategy,
          founders: pitchData.founders,
          teamSize: pitchData.teamSize,
          visionStatement: pitchData.visionStatement,
          longTermGoals: pitchData.longTermGoals,
          designStyle: pitchData.designStyle,
          logoUrl:
            pitchData.logoUrl || "https://placehold.co/400x200?text=Logo",
        },
      };

      // Create the pitch deck record
      const createRes = await createPitchDeck(payload);

      const id =
        (createRes.data as Record<string, unknown>)?._id ||
        (createRes.data as Record<string, unknown>)?.id ||
        (createRes as Record<string, unknown>)._id ||
        (createRes as Record<string, unknown>).id;

      if (!id || typeof id !== "string") {
        toast.error("No valid ID returned from pitch deck creation");
        setError("No valid ID returned from pitch deck creation");
        setIsLoading(false);
        return;
      }

      // Start simulation and polling BEFORE triggering backend generation
      simulateRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 99) {
            const next = prev + Math.random() * 1.5 + 0.5;
            setPhaseIndex(
              next < 20 ? 0 : next < 40 ? 1 : next < 60 ? 2 : next < 80 ? 3 : 4
            );
            return Math.min(next, 99);
          }
          return prev;
        });
      }, 800);

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
          toast.error("Failed to check generation status. Please try again.");
        }
      }, 5000);

      // Set timeout to prevent infinite polling
      setTimeout(() => {
        clearInterval(pollRef.current!);
        if (isLoading) {
          setIsLoading(false);
          setError(
            "Generation is taking longer than expected. Please check back later."
          );
          toast.error(
            "Generation is taking longer than expected. Please check back later."
          );
        }
      }, 300000); // 5 minutes timeout

      // Now trigger backend generation WITHOUT awaiting
      generatePitchDeck(id).then((result) => {
        if (result?.usedFallback && result?.message) {
          toast.error(result.message, { duration: 8000 });
        }
      });
    } catch (error) {
      if (simulateRef.current) clearInterval(simulateRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      setIsLoading(false);

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          // Use the auth interceptor for consistent handling
          handleAuthError(401);
          setError("Session expired. Please log in again.");
        } else {
          setError(error.message);
          toast.error(error.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
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
        {/* Autofill Button (DEV only) */}
        {process.env.NODE_ENV !== "production" && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setAutofillData(TEST_FORM_DATA);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-colors text-sm font-semibold"
            >
              Autofill Test Data
            </button>
          </div>
        )}
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
        <MultiStepForm onSubmit={handleGenerate} initialData={autofillData} />
      </div>
    </div>
  );
};

export default FormView;
