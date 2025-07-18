import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import {
  getAllTemplates,
  getTemplatesByCategory,
  type PitchDeckTemplate,
} from "@/services/templateService";
import { FiBarChart2, FiTrendingUp } from "react-icons/fi";
import {
  MdBusinessCenter,
  MdHandshake,
  MdGroup,
  MdRocket,
  MdLightbulbOutline,
} from "react-icons/md";

const categoryIcons: Record<string, React.ReactNode> = {
  all: <FiBarChart2 />,
  fundraising: <FiTrendingUp />,
  enterprise: <MdBusinessCenter />,
  product: <MdRocket />,
  partnership: <MdHandshake />,
  investor: <MdLightbulbOutline />,
  crowdfunding: <MdGroup />,
};

const TemplatesView: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<PitchDeckTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Load templates from service
    setTimeout(() => {
      setTemplates(getAllTemplates());
      setLoading(false);
    }, 500);
  }, []);

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "fundraising", name: "Fundraising" },
    { id: "enterprise", name: "Enterprise" },
    { id: "product", name: "Product Launch" },
    { id: "partnership", name: "Partnership" },
    { id: "investor", name: "Investor Update" },
    { id: "crowdfunding", name: "Crowdfunding" },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : getTemplatesByCategory(selectedCategory);

  const getTemplateIcon = (category: string) => {
    return categoryIcons[category] || <FiBarChart2 />;
  };

  const getTemplateColor = (category: string) => {
    const colors = {
      fundraising: "from-green-500 to-emerald-500",
      enterprise: "from-blue-500 to-cyan-500",
      product: "from-purple-500 to-indigo-500",
      partnership: "from-orange-500 to-red-500",
      investor: "from-teal-500 to-cyan-500",
      crowdfunding: "from-pink-500 to-rose-500",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Intermediate:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      Advanced: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    };
    return (
      colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-accent mx-auto mb-4"></div>
          <p className="text-secondary dark:text-secondary-light">
            Loading templates...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary-dark/20 dark:to-accent/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative px-6 py-12 mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-accent mb-4">
              Pitch Deck Templates
            </h1>
            <p className="text-xl text-secondary dark:text-secondary-light max-w-2xl mx-auto">
              Choose from our curated collection of complete pitch deck
              templates for any business scenario
            </p>
            <div className="mt-8">
              <Button
                onClick={() => navigate("/create")}
                variant="primary"
                className="text-lg px-8 py-3"
              >
                Create Custom Deck
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-surface dark:bg-surface-dark text-secondary dark:text-secondary-light hover:bg-accent-light dark:hover:bg-accent hover:scale-105"
                }`}
              >
                <span className="text-lg">{getTemplateIcon(category.id)}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-surface dark:bg-surface-dark rounded-2xl p-8 shadow-soft dark:shadow-neumorphic-dark hover:shadow-xl dark:hover:shadow-neumorphic-dark/50 transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20 dark:hover:border-accent/20"
              >
                {/* Template Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getTemplateColor(
                      template.category
                    )} flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {getTemplateIcon(template.category)}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        template.difficulty
                      )}`}
                    >
                      {template.difficulty}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <h3 className="text-2xl font-bold text-primary dark:text-accent mb-3 group-hover:text-primary-light dark:group-hover:text-accent-light transition-colors">
                  {template.name}
                </h3>
                <p className="text-secondary dark:text-secondary-light mb-4">
                  {template.description}
                </p>

                {/* Template Stats */}
                <div className="flex items-center gap-6 mb-6 text-sm text-secondary dark:text-secondary-light">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>{template.slideCount} slides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{template.duration}</span>
                  </div>
                </div>

                {/* Slide Preview */}
                <div className="bg-background dark:bg-background-dark rounded-lg p-4 mb-6 border border-secondary/20 dark:border-secondary-dark/20">
                  <h4 className="font-semibold text-primary dark:text-accent mb-3">
                    Slide Structure:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-secondary dark:text-secondary-light">
                    {template.slides.slice(0, 8).map((slide, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-primary dark:text-accent font-medium">
                          {index + 1}.
                        </span>
                        <span className="truncate">{slide}</span>
                      </div>
                    ))}
                    {template.slides.length > 8 && (
                      <div className="col-span-2 text-center text-primary dark:text-accent font-medium">
                        +{template.slides.length - 8} more slides
                      </div>
                    )}
                  </div>
                </div>

                {/* Best For & Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary dark:text-accent mb-2">
                    Best For:
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.bestFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent-light dark:bg-white/10 text-xs rounded-full text-primary dark:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-semibold text-primary dark:text-accent mb-2">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-background dark:bg-background-dark text-xs rounded-full text-secondary dark:text-secondary-light border border-secondary/20 dark:border-secondary-dark/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      navigate(`/view/${template.id}?template=${template.id}`)
                    }
                    variant="primary"
                    className="flex-1"
                  >
                    Use This Template
                  </Button>
                  <Button
                    onClick={() => {
                      /* Preview functionality */
                    }}
                    variant="outline"
                    className="px-4"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </Button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-primary dark:text-accent mb-2">
                No templates found
              </h3>
              <p className="text-secondary dark:text-secondary-light">
                Try selecting a different category or create a custom deck.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesView;
