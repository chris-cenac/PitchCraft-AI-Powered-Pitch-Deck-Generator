import React, { useState } from "react";
import Stepper from "./StepperComponent";
import { TextInput, TextArea, SelectDropdown } from "@/components/form";

// Define the PitchFormData shape
export interface PitchFormData {
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
  onSubmit: (PitchFormData: PitchFormData) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [FormData, setFormData] = useState<PitchFormData>({
    // Step 1: Company Basics
    companyName: "",
    tagline: "",
    websiteUrl: "",
    industry: "",
    businessStage: "",
    logo: null,

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          logo: "Please select a valid image file (JPEG, PNG, GIF, or WebP)",
        }));
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          logo: "File size must be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, logo: file }));
      setErrors((prev) => ({ ...prev, logo: "" }));
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (stepNumber) {
      case 1:
        if (!FormData.companyName.trim())
          newErrors.companyName = "Company name is required";
        if (!FormData.industry.trim())
          newErrors.industry = "Industry is required";
        if (!FormData.businessStage)
          newErrors.businessStage = "Business stage is required";
        if (FormData.websiteUrl && !isValidUrl(FormData.websiteUrl)) {
          newErrors.websiteUrl = "Please enter a valid URL";
        }
        break;

      case 2:
        if (!FormData.problemStatement.trim())
          newErrors.problemStatement = "Problem statement is required";
        if (!FormData.targetAudience.trim())
          newErrors.targetAudience = "Target audience is required";
        if (!FormData.proposedSolution.trim())
          newErrors.proposedSolution = "Proposed solution is required";
        if (!FormData.uniqueValueProposition.trim())
          newErrors.uniqueValueProposition =
            "Unique value proposition is required";
        break;

      case 3:
        if (!FormData.revenueModel.trim())
          newErrors.revenueModel = "Revenue model is required";
        if (!FormData.pricingStrategy)
          newErrors.pricingStrategy = "Pricing strategy is required";
        if (!FormData.goToMarketStrategy.trim())
          newErrors.goToMarketStrategy = "Go-to-market strategy is required";
        if (!FormData.marketSize.trim())
          newErrors.marketSize = "Market size is required";
        break;

      case 4:
        if (!FormData.founders.trim())
          newErrors.founders = "Founders information is required";
        if (!FormData.teamSize.trim())
          newErrors.teamSize = "Team size is required";
        if (FormData.teamSize && isNaN(Number(FormData.teamSize))) {
          newErrors.teamSize = "Team size must be a number";
        }
        break;

      case 6:
        if (!FormData.visionStatement.trim())
          newErrors.visionStatement = "Vision statement is required";
        if (!FormData.longTermGoals.trim())
          newErrors.longTermGoals = "Long-term goals are required";
        break;

      case 7:
        if (!FormData.designStyle)
          newErrors.designStyle = "Design style is required";
        if (FormData.brandColors && !isValidColorFormat(FormData.brandColors)) {
          newErrors.brandColors =
            "Please enter valid hex colors (e.g., #14248a, #998fc7)";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidColorFormat = (colors: string): boolean => {
    const colorArray = colors.split(",").map((c) => c.trim());
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    return colorArray.every((color) => hexPattern.test(color));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(FormData);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <TextInput
              label="Company Name"
              name="companyName"
              value={FormData.companyName}
              onChange={handleChange}
              required
              error={errors.companyName}
            />
            <TextInput
              label="Tagline / Slogan (Optional)"
              name="tagline"
              value={FormData.tagline}
              onChange={handleChange}
            />
            <TextInput
              label="Website URL (Optional)"
              name="websiteUrl"
              value={FormData.websiteUrl}
              onChange={handleChange}
              type="url"
              error={errors.websiteUrl}
              placeholder="https://example.com"
            />
            <TextInput
              label="Industry / Sector"
              name="industry"
              value={FormData.industry}
              onChange={handleChange}
              required
              error={errors.industry}
            />
            <SelectDropdown
              label="Stage of Business"
              name="businessStage"
              value={FormData.businessStage}
              onChange={handleChange}
              required
              error={errors.businessStage}
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
              {errors.logo && (
                <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
              )}
              {FormData.logo && (
                <p className="text-sm text-green-600 mt-1">
                  Selected: {FormData.logo.name} (
                  {(FormData.logo.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <TextArea
              label="Problem Statement"
              name="problemStatement"
              value={FormData.problemStatement}
              onChange={handleChange}
              required
              error={errors.problemStatement}
              placeholder="Describe the problem your company solves..."
            />
            <TextInput
              label="Target Audience / Customer Segment"
              name="targetAudience"
              value={FormData.targetAudience}
              onChange={handleChange}
              required
              error={errors.targetAudience}
              placeholder="Who are your ideal customers?"
            />
            <TextArea
              label="Proposed Solution"
              name="proposedSolution"
              value={FormData.proposedSolution}
              onChange={handleChange}
              required
              error={errors.proposedSolution}
              placeholder="How does your product/service solve the problem?"
            />
            <TextInput
              label="Unique Value Proposition"
              name="uniqueValueProposition"
              value={FormData.uniqueValueProposition}
              onChange={handleChange}
              required
              error={errors.uniqueValueProposition}
              placeholder="What makes you different from competitors?"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <TextInput
              label="Revenue Model"
              name="revenueModel"
              value={FormData.revenueModel}
              onChange={handleChange}
              required
              error={errors.revenueModel}
              placeholder="How do you make money?"
            />
            <SelectDropdown
              label="Pricing Strategy"
              name="pricingStrategy"
              value={FormData.pricingStrategy}
              onChange={handleChange}
              required
              error={errors.pricingStrategy}
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
              value={FormData.goToMarketStrategy}
              onChange={handleChange}
              required
              error={errors.goToMarketStrategy}
              placeholder="How will you acquire customers?"
            />
            <TextInput
              label="Market Size / Opportunity"
              name="marketSize"
              value={FormData.marketSize}
              onChange={handleChange}
              required
              error={errors.marketSize}
              placeholder="What's the size of your market?"
            />
            <TextInput
              label="Competitors (Optional)"
              name="competitors"
              value={FormData.competitors}
              onChange={handleChange}
              placeholder="Who are your main competitors?"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <TextArea
              label="Founders & Roles"
              name="founders"
              value={FormData.founders}
              onChange={handleChange}
              required
              error={errors.founders}
              placeholder="List founders and their roles..."
            />
            <TextInput
              label="Team Size"
              name="teamSize"
              value={FormData.teamSize}
              onChange={handleChange}
              type="number"
              min="1"
              required
              error={errors.teamSize}
              placeholder="Total number of team members"
            />
            <TextInput
              label="Notable Advisors / Mentors (Optional)"
              name="advisors"
              value={FormData.advisors}
              onChange={handleChange}
              placeholder="List key advisors and their expertise..."
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <SelectDropdown
              label="Funding Stage"
              name="fundingStage"
              value={FormData.fundingStage}
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
              value={FormData.amountRaised}
              onChange={handleChange}
              type="number"
              min="0"
              placeholder="Enter amount in USD"
            />
            <TextInput
              label="Projected Revenue (1-3 years)"
              name="projectedRevenue"
              value={FormData.projectedRevenue}
              onChange={handleChange}
              type="text"
              placeholder="e.g., $1M in Year 1, $3M in Year 2"
            />
            <TextInput
              label="Costs / Burn Rate"
              name="costs"
              value={FormData.costs}
              onChange={handleChange}
              type="text"
              placeholder="e.g., $50K monthly burn rate"
            />
            <TextInput
              label="Financial Milestones Achieved"
              name="financialMilestones"
              value={FormData.financialMilestones}
              onChange={handleChange}
              placeholder="Key financial achievements..."
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <TextArea
              label="Vision Statement"
              name="visionStatement"
              value={FormData.visionStatement}
              onChange={handleChange}
              required
              error={errors.visionStatement}
              placeholder="What's your long-term vision?"
            />
            <TextArea
              label="Long-Term Goals"
              name="longTermGoals"
              value={FormData.longTermGoals}
              onChange={handleChange}
              required
              error={errors.longTermGoals}
              placeholder="What are your key long-term objectives?"
            />
            <TextInput
              label="Exit Strategy (Optional)"
              name="exitStrategy"
              value={FormData.exitStrategy}
              onChange={handleChange}
              placeholder="IPO, acquisition, etc."
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <SelectDropdown
              label="Preferred Design Style"
              name="designStyle"
              value={FormData.designStyle}
              onChange={handleChange}
              required
              error={errors.designStyle}
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
                Logo Upload Preview
              </label>
              {FormData.logo ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">✓</span>
                  <p className="text-sm">{FormData.logo.name}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, logo: null }))
                    }
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <p className="text-sm text-muted">No logo uploaded</p>
              )}
            </div>
            <TextInput
              label="Brand Colors (Optional)"
              name="brandColors"
              value={FormData.brandColors}
              onChange={handleChange}
              placeholder="#14248a, #998fc7, #d4c2fc"
              error={errors.brandColors}
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Review Your Information</h3>

            <div className="grid gap-4">
              <div className="card">
                <h4 className="font-bold mb-2">Company Basics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Name:</strong> {FormData.companyName}
                  </p>
                  <p>
                    <strong>Industry:</strong> {FormData.industry}
                  </p>
                  <p>
                    <strong>Stage:</strong> {FormData.businessStage}
                  </p>
                  <p>
                    <strong>Tagline:</strong> {FormData.tagline || "N/A"}
                  </p>
                  <p>
                    <strong>Website:</strong> {FormData.websiteUrl || "N/A"}
                  </p>
                  <p>
                    <strong>Logo:</strong>{" "}
                    {FormData.logo ? FormData.logo.name : "N/A"}
                  </p>
                </div>
              </div>

              <div className="card">
                <h4 className="font-bold mb-2">Problem & Solution</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Problem:</strong>{" "}
                    {FormData.problemStatement.substring(0, 100)}...
                  </p>
                  <p>
                    <strong>Target Audience:</strong> {FormData.targetAudience}
                  </p>
                  <p>
                    <strong>Solution:</strong>{" "}
                    {FormData.proposedSolution.substring(0, 100)}...
                  </p>
                </div>
              </div>

              <div className="card">
                <h4 className="font-bold mb-2">Business Model</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Revenue Model:</strong> {FormData.revenueModel}
                  </p>
                  <p>
                    <strong>Pricing:</strong> {FormData.pricingStrategy}
                  </p>
                  <p>
                    <strong>Market Size:</strong> {FormData.marketSize}
                  </p>
                  <p>
                    <strong>Competitors:</strong>{" "}
                    {FormData.competitors || "N/A"}
                  </p>
                </div>
              </div>

              <div className="card">
                <h4 className="font-bold mb-2">Team & Financials</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Team Size:</strong> {FormData.teamSize}
                  </p>
                  <p>
                    <strong>Funding Stage:</strong>{" "}
                    {FormData.fundingStage || "N/A"}
                  </p>
                  <p>
                    <strong>Amount Raised:</strong>{" "}
                    {FormData.amountRaised
                      ? `$${FormData.amountRaised}`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Design Style:</strong> {FormData.designStyle}
                  </p>
                </div>
              </div>
            </div>

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
      <div className="mb-8">
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
