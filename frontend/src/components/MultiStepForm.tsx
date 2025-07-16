import React, { useState } from "react";
import Stepper from "./StepperComponent";
import { TextInput, TextArea, SelectDropdown } from "@/components/form";
// Define the FormData shape
export interface FormData {
  // Step 1: Company Basics
  companyName: string;
  tagline: string;
  websiteUrl: string;
  industry: string;
  businessStage: string;
  logo: File | null;

  // Step 2: Problem & Solution
  problemStatement: string;
  targetAudience: string;
  proposedSolution: string;
  uniqueValueProposition: string;

  // Step 3: Business Model & Market
  revenueModel: string;
  pricingStrategy: string;
  goToMarketStrategy: string;
  marketSize: string;
  competitors: string;

  // Step 4: Team
  founders: string;
  teamSize: string;
  advisors: string;

  // Step 5: Financials
  fundingStage: string;
  amountRaised: string;
  projectedRevenue: string;
  costs: string;
  financialMilestones: string;

  // Step 6: Vision & Goals
  visionStatement: string;
  longTermGoals: string;
  exitStrategy: string;

  // Step 7: Style Preferences
  designStyle: string;
  brandColors: string;
}
interface MultiStepFormProps {
  onSubmit: (formData: FormData) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Company Basics
    companyName: "",
    tagline: "",
    websiteUrl: "",
    industry: "",
    businessStage: "",
    logo: null as File | null,

    // Step 2: Problem & Solution
    problemStatement: "",
    targetAudience: "",
    proposedSolution: "",
    uniqueValueProposition: "",

    // Step 3: Business Model & Market
    revenueModel: "",
    pricingStrategy: "",
    goToMarketStrategy: "",
    marketSize: "",
    competitors: "",

    // Step 4: Team
    founders: "",
    teamSize: "",
    advisors: "",

    // Step 5: Financials
    fundingStage: "",
    amountRaised: "",
    projectedRevenue: "",
    costs: "",
    financialMilestones: "",

    // Step 6: Vision & Goals
    visionStatement: "",
    longTermGoals: "",
    exitStrategy: "",

    // Step 7: Style Preferences
    designStyle: "",
    brandColors: "",
  });

  const steps = [
    { title: "Company Basics", description: "Company information" },
    {
      title: "Problem & Solution",
      description: "Define your value proposition",
    },
    {
      title: "Business Model & Market",
      description: "Revenue and market strategy",
    },
    { title: "Team", description: "Your core team members" },
    { title: "Financials", description: "Financial projections" },
    { title: "Vision & Goals", description: "Long-term objectives" },
    { title: "Style Preferences", description: "Design and branding" },
    { title: "Review & Confirm", description: "Verify your information" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <TextInput
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Tagline / Slogan (Optional)"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
            />
            <TextInput
              label="Website URL (Optional)"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              type="url"
            />
            <TextInput
              label="Industry / Sector"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
            <SelectDropdown
              label="Stage of Business"
              name="businessStage"
              value={formData.businessStage}
              onChange={handleChange}
              required
            >
              <option value="">Select stage</option>
              <option value="Idea">Idea</option>
              <option value="MVP">MVP</option>
              <option value="Revenue">Revenue</option>
              <option value="Growth">Growth</option>
            </SelectDropdown>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-primary dark:text-accent">
                Logo Upload (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <TextArea
              label="Problem Statement"
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Target Audience / Customer Segment"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              required
            />
            <TextArea
              label="Proposed Solution"
              name="proposedSolution"
              value={formData.proposedSolution}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Unique Value Proposition"
              name="uniqueValueProposition"
              value={formData.uniqueValueProposition}
              onChange={handleChange}
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <TextInput
              label="Revenue Model"
              name="revenueModel"
              value={formData.revenueModel}
              onChange={handleChange}
              required
            />
            <SelectDropdown
              label="Pricing Strategy"
              name="pricingStrategy"
              value={formData.pricingStrategy}
              onChange={handleChange}
              required
            >
              <option value="">Select strategy</option>
              <option value="Subscription">Subscription</option>
              <option value="Freemium">Freemium</option>
              <option value="One-time">One-time fee</option>
              <option value="Tiered">Tiered pricing</option>
            </SelectDropdown>
            <TextInput
              label="Go-to-Market Strategy"
              name="goToMarketStrategy"
              value={formData.goToMarketStrategy}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Market Size / Opportunity"
              name="marketSize"
              value={formData.marketSize}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Competitors (Optional)"
              name="competitors"
              value={formData.competitors}
              onChange={handleChange}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <TextArea
              label="Founders & Roles"
              name="founders"
              value={formData.founders}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Team Size"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              type="number"
              min="1"
              required
            />
            <TextInput
              label="Notable Advisors / Mentors (Optional)"
              name="advisors"
              value={formData.advisors}
              onChange={handleChange}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <SelectDropdown
              label="Funding Stage"
              name="fundingStage"
              value={formData.fundingStage}
              onChange={handleChange}
            >
              <option value="">Select stage</option>
              <option value="Bootstrapped">Bootstrapped</option>
              <option value="Pre-seed">Pre-seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B+">Series B+</option>
            </SelectDropdown>
            <TextInput
              label="Amount Raised (if any)"
              name="amountRaised"
              value={formData.amountRaised}
              onChange={handleChange}
              type="number"
              min="0"
            />
            <TextInput
              label="Projected Revenue (1-3 years)"
              name="projectedRevenue"
              value={formData.projectedRevenue}
              onChange={handleChange}
              type="text"
            />
            <TextInput
              label="Costs / Burn Rate"
              name="costs"
              value={formData.costs}
              onChange={handleChange}
              type="text"
            />
            <TextInput
              label="Financial Milestones Achieved"
              name="financialMilestones"
              value={formData.financialMilestones}
              onChange={handleChange}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <TextArea
              label="Vision Statement"
              name="visionStatement"
              value={formData.visionStatement}
              onChange={handleChange}
              required
            />
            <TextArea
              label="Long-Term Goals"
              name="longTermGoals"
              value={formData.longTermGoals}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Exit Strategy (Optional)"
              name="exitStrategy"
              value={formData.exitStrategy}
              onChange={handleChange}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <SelectDropdown
              label="Preferred Design Style"
              name="designStyle"
              value={formData.designStyle}
              onChange={handleChange}
              required
            >
              <option value="">Select style</option>
              <option value="Minimal">Minimal</option>
              <option value="Bold">Bold</option>
              <option value="Playful">Playful</option>
              <option value="Corporate">Corporate</option>
              <option value="Elegant">Elegant</option>
            </SelectDropdown>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-primary dark:text-accent">
                Logo Upload Preview (Optional)
              </label>
              {formData.logo ? (
                <p className="text-sm">{formData.logo.name}</p>
              ) : (
                <p className="text-sm text-muted">No file uploaded</p>
              )}
            </div>
            <TextInput
              label="Brand Colors (Optional) - Comma separated hex values"
              name="brandColors"
              value={formData.brandColors}
              onChange={handleChange}
              placeholder="#14248a, #998fc7, #d4c2fc"
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Review Your Information</h3>
            <div className="card">
              <h4 className="font-bold mb-2">Company Basics</h4>
              <p>
                <strong>Name:</strong> {formData.companyName}
              </p>
              <p>
                <strong>Tagline:</strong> {formData.tagline || "N/A"}
              </p>
              <p>
                <strong>Website:</strong> {formData.websiteUrl || "N/A"}
              </p>
              <p>
                <strong>Industry:</strong> {formData.industry}
              </p>
              <p>
                <strong>Stage:</strong> {formData.businessStage}
              </p>
              <p>
                <strong>Logo:</strong>{" "}
                {formData.logo ? formData.logo.name : "N/A"}
              </p>
            </div>

            {/* Additional review cards... */}

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary"
              >
                Generate Pitch Deck
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12">
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold mb-2">Pitch Deck Generator</h1>
        <p className="text-muted dark:text-muted">
          Complete all steps to generate your customized pitch deck
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="sticky top-6">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h2>
              <span className="text-sm text-muted dark:text-muted">
                {currentStep} of {steps.length}
              </span>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Previous
                </button>
              )}
              {currentStep < steps.length && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary ml-auto"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
