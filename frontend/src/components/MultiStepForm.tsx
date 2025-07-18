import React, { useState, forwardRef, useImperativeHandle } from "react";
import Stepper from "./StepperComponent";
import { TextInput, TextArea, SelectDropdown } from "@/components/form";

// Streamlined PitchFormData shape
export interface PitchFormData {
  // Step 1: Company Basics
  companyName: string;
  tagline: string;
  industry: string;
  businessStage: string;

  // Step 2: Problem & Solution
  problemStatement: string;
  targetAudience: string;
  proposedSolution: string;
  uniqueValueProposition: string;

  // Step 3: Business & Market
  revenueModel: string;
  marketSize: string;
  competitors: string;
  pricingStrategy: string;
  goToMarketStrategy: string;

  // Step 4: Team & Vision
  founders: string;
  teamSize: string;
  visionStatement: string;
  longTermGoals: string;

  // Step 5: Design Preferences
  designStyle: string;
}

interface MultiStepFormProps {
  onSubmit: (PitchFormData: PitchFormData) => void;
}

export interface MultiStepFormHandle {
  autofill: () => void;
}

const MultiStepForm = forwardRef<MultiStepFormHandle, MultiStepFormProps>(
  ({ onSubmit }, ref) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [FormData, setFormData] = useState<PitchFormData>({
      // Step 1: Company Basics
      companyName: "",
      tagline: "",
      industry: "",
      businessStage: "",

      // Step 2: Problem & Solution
      problemStatement: "",
      targetAudience: "",
      proposedSolution: "",
      uniqueValueProposition: "",

      // Step 3: Business & Market
      revenueModel: "",
      marketSize: "",
      competitors: "",
      pricingStrategy: "",
      goToMarketStrategy: "",

      // Step 4: Team & Vision
      founders: "",
      teamSize: "",
      visionStatement: "",
      longTermGoals: "",

      // Step 5: Design Preferences
      designStyle: "",
    });

    // Autofill method for testing
    useImperativeHandle(ref, () => ({
      autofill: () => {
        setFormData({
          companyName: "TechFlow Solutions",
          tagline: "Revolutionizing Enterprise Workflow Automation",
          industry: "SaaS / AI",
          businessStage: "Growth",
          problemStatement:
            "Manual workflows cost enterprises billions in lost productivity and errors.",
          targetAudience:
            "Enterprise operations teams, CIOs, and process managers",
          proposedSolution:
            "AI-powered platform that automates, optimizes, and learns from every workflow.",
          uniqueValueProposition:
            "Our AI-driven automation delivers 10x efficiency.",
          revenueModel: "Subscription (SaaS) + Enterprise Licensing",
          marketSize: "$45B TAM, $12B SAM",
          competitors: "UiPath, Automation Anywhere, Blue Prism",
          pricingStrategy: "Tiered SaaS pricing with enterprise discounts.",
          goToMarketStrategy:
            "Direct sales, channel partners, and inbound marketing.",
          founders:
            "Jane Doe (CEO, ex-Salesforce), John Smith (CTO, ex-Google)",
          teamSize: "15",
          visionStatement:
            "To become the global standard for intelligent business automation.",
          longTermGoals: "Become the global leader in workflow automation.",
          designStyle: "Bold",
        });
      },
    }));

    const steps = [
      { title: "Company Basics", description: "Basic company information" },
      {
        title: "Problem & Solution",
        description: "What problem do you solve?",
      },
      {
        title: "Business & Market",
        description: "How do you make money?",
      },
      {
        title: "Team & Vision",
        description: "Who are you and where are you going?",
      },
      { title: "Design Style", description: "How should it look?" },
      {
        title: "Review & Generate",
        description: "Verify and create your deck",
      },
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
          if (!FormData.marketSize.trim())
            newErrors.marketSize = "Market size is required";
          if (!FormData.pricingStrategy.trim())
            newErrors.pricingStrategy = "Pricing strategy is required";
          if (!FormData.goToMarketStrategy.trim())
            newErrors.goToMarketStrategy = "Go-to-market strategy is required";
          break;

        case 4:
          if (!FormData.founders.trim())
            newErrors.founders = "Founders information is required";
          if (!FormData.teamSize.trim())
            newErrors.teamSize = "Team size is required";
          if (!FormData.visionStatement.trim())
            newErrors.visionStatement = "Vision statement is required";
          if (!FormData.longTermGoals.trim())
            newErrors.longTermGoals = "Long-term goals are required";
          break;

        case 5:
          if (!FormData.designStyle)
            newErrors.designStyle = "Design style is required";
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
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
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Tell us about your company
                </h3>
                <p className="text-secondary dark:text-secondary-light">
                  Let's start with the basics
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  label="Company Name *"
                  name="companyName"
                  value={FormData.companyName}
                  onChange={handleChange}
                  required
                  error={errors.companyName}
                  placeholder="e.g., TechStart Inc."
                />

                <TextInput
                  label="Industry / Sector *"
                  name="industry"
                  value={FormData.industry}
                  onChange={handleChange}
                  required
                  error={errors.industry}
                  placeholder="e.g., FinTech, Healthcare, SaaS"
                />
              </div>

              <TextInput
                label="Tagline (Optional)"
                name="tagline"
                value={FormData.tagline}
                onChange={handleChange}
                placeholder="e.g., Revolutionizing the future of..."
              />

              <SelectDropdown
                label="Business Stage *"
                name="businessStage"
                value={FormData.businessStage}
                onChange={handleChange}
                required
                error={errors.businessStage}
              >
                <option value="">Select your stage</option>
                <option value="Idea">Idea Stage</option>
                <option value="MVP">MVP / Prototype</option>
                <option value="Early Revenue">Early Revenue</option>
                <option value="Growth">Growth Stage</option>
                <option value="Scale">Scale Stage</option>
              </SelectDropdown>
            </div>
          );

        case 2:
          return (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  What problem are you solving?
                </h3>
                <p className="text-secondary dark:text-secondary-light">
                  Help investors understand your value
                </p>
              </div>

              <TextArea
                label="Problem Statement *"
                name="problemStatement"
                value={FormData.problemStatement}
                onChange={handleChange}
                required
                error={errors.problemStatement}
                placeholder="Describe the problem your company solves in 1-2 sentences..."
                rows={3}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  label="Target Audience *"
                  name="targetAudience"
                  value={FormData.targetAudience}
                  onChange={handleChange}
                  required
                  error={errors.targetAudience}
                  placeholder="e.g., Small business owners, Enterprise companies"
                />

                <TextArea
                  label="Your Solution *"
                  name="proposedSolution"
                  value={FormData.proposedSolution}
                  onChange={handleChange}
                  required
                  error={errors.proposedSolution}
                  placeholder="How does your product/service solve this problem?"
                  rows={3}
                />
              </div>

              <TextInput
                label="Unique Value Proposition *"
                name="uniqueValueProposition"
                value={FormData.uniqueValueProposition}
                onChange={handleChange}
                required
                error={errors.uniqueValueProposition}
                placeholder="What makes your solution unique or better?"
              />
            </div>
          );

        case 3:
          return (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Business & Market
                </h3>
                <p className="text-secondary dark:text-secondary-light">
                  Show your business model and market opportunity
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  label="Revenue Model *"
                  name="revenueModel"
                  value={FormData.revenueModel}
                  onChange={handleChange}
                  required
                  error={errors.revenueModel}
                  placeholder="e.g., Subscription, Transaction fees, Freemium"
                />

                <TextInput
                  label="Market Size *"
                  name="marketSize"
                  value={FormData.marketSize}
                  onChange={handleChange}
                  required
                  error={errors.marketSize}
                  placeholder="e.g., $50B TAM, $5B SAM"
                />
              </div>

              <TextInput
                label="Main Competitors (Optional)"
                name="competitors"
                value={FormData.competitors}
                onChange={handleChange}
                placeholder="e.g., Stripe, Square, PayPal"
              />

              <TextInput
                label="Pricing Strategy *"
                name="pricingStrategy"
                value={FormData.pricingStrategy}
                onChange={handleChange}
                required
                error={errors.pricingStrategy}
                placeholder="How do you price your product/service?"
              />

              <TextInput
                label="Go-to-Market Strategy *"
                name="goToMarketStrategy"
                value={FormData.goToMarketStrategy}
                onChange={handleChange}
                required
                error={errors.goToMarketStrategy}
                placeholder="How will you acquire customers?"
              />
            </div>
          );

        case 4:
          return (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Team & Vision</h3>
                <p className="text-secondary dark:text-secondary-light">
                  Tell us about your team and future vision
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextArea
                  label="Founders & Key Team *"
                  name="founders"
                  value={FormData.founders}
                  onChange={handleChange}
                  required
                  error={errors.founders}
                  placeholder="List founders and key team members with their roles..."
                  rows={3}
                />

                <TextInput
                  label="Team Size *"
                  name="teamSize"
                  value={FormData.teamSize}
                  onChange={handleChange}
                  required
                  error={errors.teamSize}
                  placeholder="e.g., 15"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextArea
                  label="Vision Statement *"
                  name="visionStatement"
                  value={FormData.visionStatement}
                  onChange={handleChange}
                  required
                  error={errors.visionStatement}
                  placeholder="What's your long-term vision for the company?"
                  rows={3}
                />

                <TextInput
                  label="Long-Term Goals *"
                  name="longTermGoals"
                  value={FormData.longTermGoals}
                  onChange={handleChange}
                  required
                  error={errors.longTermGoals}
                  placeholder="What are your long-term goals?"
                />
              </div>
            </div>
          );

        case 5:
          return (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Design Preferences
                </h3>
                <p className="text-secondary dark:text-secondary-light">
                  Choose how your pitch deck should look
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <SelectDropdown
                  label="Design Style *"
                  name="designStyle"
                  value={FormData.designStyle}
                  onChange={handleChange}
                  required
                  error={errors.designStyle}
                >
                  <option value="">Select your preferred style</option>
                  <option value="Minimal">Minimal & Clean</option>
                  <option value="Bold">Bold & Modern</option>
                  <option value="Playful">Playful & Creative</option>
                  <option value="Corporate">Professional & Corporate</option>
                  <option value="Elegant">Elegant & Sophisticated</option>
                </SelectDropdown>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-4 border border-primary/20 dark:border-accent/20">
                <h4 className="font-semibold mb-2 text-primary dark:text-accent">
                  What you'll get:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-secondary dark:text-secondary-light">
                      Professional pitch deck with 8-12 slides
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-secondary dark:text-secondary-light">
                      Customized content based on your inputs
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-secondary dark:text-secondary-light">
                      Modern design matching your style preference
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-secondary dark:text-secondary-light">
                      Ready for investor presentations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );

        case 6:
          return (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Review Your Information
                </h3>
                <p className="text-secondary dark:text-secondary-light">
                  Everything looks good? Let's create your pitch deck!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20 dark:border-accent/20">
                  <h4 className="font-bold mb-3 text-primary dark:text-accent flex items-center">
                    <div className="w-2 h-2 bg-primary dark:bg-accent rounded-full mr-2"></div>
                    Company
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Name:
                      </span>
                      <p className="mt-1">{FormData.companyName}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Industry:
                      </span>
                      <p className="mt-1">{FormData.industry}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Stage:
                      </span>
                      <p className="mt-1">{FormData.businessStage}</p>
                    </div>
                    {FormData.tagline && (
                      <div>
                        <span className="font-semibold text-secondary dark:text-secondary-light">
                          Tagline:
                        </span>
                        <p className="mt-1">{FormData.tagline}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20 dark:border-accent/20">
                  <h4 className="font-bold mb-3 text-primary dark:text-accent flex items-center">
                    <div className="w-2 h-2 bg-primary dark:bg-accent rounded-full mr-2"></div>
                    Problem & Solution
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Problem:
                      </span>
                      <p className="mt-1">{FormData.problemStatement}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Target:
                      </span>
                      <p className="mt-1">{FormData.targetAudience}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Solution:
                      </span>
                      <p className="mt-1">{FormData.proposedSolution}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Unique Value:
                      </span>
                      <p className="mt-1">{FormData.uniqueValueProposition}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20 dark:border-accent/20">
                  <h4 className="font-bold mb-3 text-primary dark:text-accent flex items-center">
                    <div className="w-2 h-2 bg-primary dark:bg-accent rounded-full mr-2"></div>
                    Business & Market
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Revenue:
                      </span>
                      <p className="mt-1">{FormData.revenueModel}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Market:
                      </span>
                      <p className="mt-1">{FormData.marketSize}</p>
                    </div>
                    {FormData.competitors && (
                      <div>
                        <span className="font-semibold text-secondary dark:text-secondary-light">
                          Competitors:
                        </span>
                        <p className="mt-1">{FormData.competitors}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Pricing:
                      </span>
                      <p className="mt-1">{FormData.pricingStrategy}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Go-to-Market:
                      </span>
                      <p className="mt-1">{FormData.goToMarketStrategy}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20 dark:border-accent/20">
                  <h4 className="font-bold mb-3 text-primary dark:text-accent flex items-center">
                    <div className="w-2 h-2 bg-primary dark:bg-accent rounded-full mr-2"></div>
                    Team & Vision
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Team:
                      </span>
                      <p className="mt-1">{FormData.founders}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Vision:
                      </span>
                      <p className="mt-1">{FormData.visionStatement}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-secondary dark:text-secondary-light">
                        Long-Term Goals:
                      </span>
                      <p className="mt-1">{FormData.longTermGoals}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/20 dark:border-accent/20">
                <h4 className="font-bold mb-3 text-primary dark:text-accent flex items-center">
                  <div className="w-2 h-2 bg-primary dark:bg-accent rounded-full mr-2"></div>
                  Design Style
                </h4>
                <p className="font-medium">{FormData.designStyle}</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light rounded-lg hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 transition-colors font-medium"
                >
                  Back to Edit
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
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
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex-1 flex flex-col xl:flex-row gap-4 lg:gap-6">
              {/* Stepper - Smaller on larger screens, full width on mobile */}
              <div className="xl:w-72 lg:w-64 order-2 xl:order-1 flex-shrink-0">
                <div className="xl:sticky xl:top-4">
                  <div className="bg-surface/50 dark:bg-surface-dark/50 rounded-xl p-4 backdrop-blur-sm">
                    <Stepper steps={steps} currentStep={currentStep} />
                  </div>
                </div>
              </div>

              {/* Form Content - Takes up most of the space */}
              <div className="flex-1 order-1 xl:order-2 min-h-0">
                <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex-1 overflow-auto">{renderStep()}</div>

                  <div className="flex justify-between mt-6 pt-4 border-t border-secondary/20 dark:border-secondary-dark/20 flex-shrink-0">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 sm:px-6 py-2 bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light rounded-lg hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 transition-colors text-sm sm:text-base"
                      >
                        ← Previous
                      </button>
                    )}
                    {currentStep < steps.length && (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-4 sm:px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 ml-auto text-sm sm:text-base font-medium"
                      >
                        Next Step →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default MultiStepForm;
