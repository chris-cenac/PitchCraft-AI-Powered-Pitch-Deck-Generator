import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLightbulb, FaCogs, FaFileAlt, FaArrowLeft } from "react-icons/fa";

const steps = [
  {
    title: "Tell Us About Your Business",
    description:
      "Enter your company details, describe your idea, upload your logo, and select your industry. Our AI analyzes your input to understand your unique story.",
    icon: FaLightbulb,
  },
  {
    title: "AI Generates Your Pitch Deck",
    description:
      "Our advanced AI researches your market, plans the perfect structure, and creates professional slides tailored to your business and industry.",
    icon: FaCogs,
  },
  {
    title: "Download & Present with Confidence",
    description:
      "Get your professionally designed pitch deck ready for investors, clients, or stakeholders. Present with confidence knowing your story is compelling.",
    icon: FaFileAlt,
  },
];

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* Header */}
      <div className="border-b border-secondary/20 dark:border-secondary-dark/20 bg-surface dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-secondary dark:text-secondary-light hover:text-primary dark:hover:text-accent transition-colors duration-200"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center py-8 pb-12">
        <h1 className="text-2xl font-bold text-primary dark:text-accent">
          How it All Works
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/30 via-secondary/50 to-accent/30"></div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-glow-primary">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Text Content */}
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-16 text-right" : "pl-16 text-left"
                    }`}
                  >
                    <div className={`${index % 2 === 0 ? "mr-6" : "ml-6"}`}>
                      <h3 className="text-xl font-bold text-primary dark:text-accent mb-3">
                        {step.title}
                      </h3>
                      <p className="text-secondary dark:text-secondary-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-1/2 flex ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`${
                        index % 2 === 0 ? "ml-6" : "mr-6"
                      } w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center shadow-soft border border-accent/30`}
                    >
                      <step.icon className="w-12 h-12 text-primary dark:text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-accent/20">
            <h2 className="text-2xl font-bold text-primary dark:text-accent mb-4">
              Ready to Create Your Pitch Deck?
            </h2>
            <p className="text-secondary dark:text-secondary-light mb-6 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have successfully pitched
              their ideas using our AI-powered platform.
            </p>
            <button
              onClick={() => navigate("/form")}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-glow-primary hover:shadow-glow-secondary transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
