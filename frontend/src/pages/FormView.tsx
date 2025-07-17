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

const FormView: React.FC = () => {
  const sampleData: PitchFormData = {
    companyName: "BrightHive Analytics",
    tagline: "Turning data into decisions",
    websiteUrl: "https://www.brighthive.io",
    industry: "Data Analytics",
    businessStage: "MVP",
    logo: null,

    problemStatement:
      "Many mid-market companies struggle to make sense of fragmented data from multiple sources, leading to slow decision cycles.",
    targetAudience:
      "Mid-market retail and finance enterprises with 50–500 employees",
    proposedSolution:
      "A no‑code platform that ingests, cleans, and visualizes your data in real time, complete with predictive insights.",
    uniqueValueProposition:
      "Deployable in 24 hrs, integrates with 30+ APIs, built‑in ML forecasting models.",

    revenueModel: "Subscription",
    pricingStrategy: "Tiered",
    goToMarketStrategy:
      "Partner with boutique consulting firms; targeted LinkedIn ads; direct sales demos.",
    marketSize: "$5 billion annual spend on analytics tools in our segment",
    competitors: "Tableau, Power BI, Looker",

    founders: "Alice Johnson (CEO), Bob Lee (CTO)",
    teamSize: "8",
    advisors: "Dr. Emily Stone (Data Science), John Perez (Go‑to‑Market)",

    fundingStage: "Seed",
    amountRaised: "750000",
    projectedRevenue: "2 M in Year 1, 5 M in Year 2",
    costs: "500 K burn per annum",
    financialMilestones: "50 paying customers; $100 K ARR achieved",

    visionStatement:
      "To become the analytics engine powering every SME's data-driven decisions.",
    longTermGoals:
      "Expand into European markets; introduce AI‑driven demand forecasting; reach 1,000 customers.",
    exitStrategy:
      "Acquisition by a major BI vendor (e.g., Tableau or Microsoft)",

    designStyle: "Minimal",
    brandColors: "#14248a, #998fc7, #d4c2fc",
  };
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
          websiteUrl: pitchData.websiteUrl,
          industry: pitchData.industry,
          businessStage: pitchData.businessStage,
          problemStatement: pitchData.problemStatement,
          targetAudience: pitchData.targetAudience,
          proposedSolution: pitchData.proposedSolution,
          uniqueValueProposition: pitchData.uniqueValueProposition,
          revenueModel: pitchData.revenueModel,
          pricingStrategy: pitchData.pricingStrategy,
          goToMarketStrategy: pitchData.goToMarketStrategy,
          marketSize: pitchData.marketSize,
          competitors: pitchData.competitors,
          founders: pitchData.founders,
          teamSize: pitchData.teamSize,
          advisors: pitchData.advisors,
          fundingStage: pitchData.fundingStage,
          amountRaised: pitchData.amountRaised,
          projectedRevenue: pitchData.projectedRevenue,
          costs: pitchData.costs,
          financialMilestones: pitchData.financialMilestones,
          visionStatement: pitchData.visionStatement,
          longTermGoals: pitchData.longTermGoals,
          exitStrategy: pitchData.exitStrategy,
          designStyle: pitchData.designStyle,
          brandColors: pitchData.brandColors,
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

  // Handler for the test button
  const handleTestSubmit = () => {
    handleGenerate(sampleData);
  };

  if (isLoading) {
    return <Loading currentPhaseIndex={phaseIndex} progress={progress} />;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Test button to submit sample data */}
      <button
        type="button"
        className="btn-primary mb-4"
        onClick={handleTestSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Test with Sample Data"}
      </button>

      {/* Actual form */}
      <MultiStepForm onSubmit={handleGenerate} />
    </div>
  );
};

export default FormView;
