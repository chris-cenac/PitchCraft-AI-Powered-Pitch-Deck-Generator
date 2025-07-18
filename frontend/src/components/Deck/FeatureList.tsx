import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { IconRenderer } from "./IconRenderer";

export const FeatureList: React.FC<{
  title?: string;
  features: Array<{
    text: string;
    icon?: string;
    highlight?: boolean;
    description?: string;
  }>;
  variant?: "default" | "checklist" | "benefits" | "highlights";
  layout?: "grid" | "list" | "cards";
  columns?: 1 | 2 | 3;
  className?: string;
}> = ({
  title,
  features,
  variant = "default",
  layout = "list",
  columns = 1,
  className = "",
}) => {
  const { theme } = useTheme();

  const variantStyles = {
    default: {
      container: theme === "dark" ? "bg-gray-800" : "bg-white",
      border: theme === "dark" ? "border-gray-700" : "border-gray-200",
      title: theme === "dark" ? "text-white" : "text-gray-900",
      item: theme === "dark" ? "text-gray-300" : "text-gray-700",
      icon: theme === "dark" ? "text-blue-400" : "text-blue-600",
    },
    checklist: {
      container: theme === "dark" ? "bg-gray-800" : "bg-white",
      border: theme === "dark" ? "border-gray-700" : "border-gray-200",
      title: theme === "dark" ? "text-white" : "text-gray-900",
      item: theme === "dark" ? "text-gray-300" : "text-gray-700",
      icon: "text-green-500",
    },
    benefits: {
      container:
        "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      border: "border-blue-200 dark:border-blue-700",
      title: theme === "dark" ? "text-blue-100" : "text-blue-900",
      item: theme === "dark" ? "text-blue-200" : "text-blue-800",
      icon: "text-blue-500",
    },
    highlights: {
      container:
        "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      border: "border-purple-200 dark:border-purple-700",
      title: theme === "dark" ? "text-purple-100" : "text-purple-900",
      item: theme === "dark" ? "text-purple-200" : "text-purple-800",
      icon: "text-purple-500",
    },
  };

  const layoutStyles = {
    grid: `grid grid-cols-1 ${
      columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : ""
    } gap-4`,
    list: "space-y-3",
    cards: `grid grid-cols-1 ${
      columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : ""
    } gap-4`,
  };

  const currentVariant = variantStyles[variant];
  const currentLayout = layoutStyles[layout];

  const getDefaultIcon = (variant: string) => {
    switch (variant) {
      case "checklist":
        return "FiCheck";
      case "benefits":
        return "FiStar";
      case "highlights":
        return "FiZap";
      default:
        return "FiCircle";
    }
  };

  const renderFeature = (
    feature: {
      text: string;
      icon?: string;
      highlight?: boolean;
      description?: string;
    },
    index: number
  ) => {
    const icon = feature.icon || getDefaultIcon(variant);
    const isHighlight = feature.highlight;

    if (layout === "cards") {
      return (
        <div
          key={index}
          className={`${currentVariant.container} ${
            currentVariant.border
          } border rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
            isHighlight ? "ring-2 ring-blue-500 ring-opacity-50" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`${currentVariant.icon} flex-shrink-0 mt-1`}>
              <IconRenderer name={icon} size={20} />
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${currentVariant.item} ${
                  isHighlight ? "font-semibold" : ""
                }`}
              >
                {feature.text}
              </p>
              {feature.description && (
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {feature.description}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="flex items-start gap-3">
        <div className={`${currentVariant.icon} flex-shrink-0 mt-1`}>
          <IconRenderer name={icon} size={18} />
        </div>
        <div className="flex-1">
          <p
            className={`${currentVariant.item} ${
              isHighlight ? "font-semibold" : ""
            }`}
          >
            {feature.text}
          </p>
          {feature.description && (
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {feature.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${currentVariant.container} ${currentVariant.border} border rounded-xl p-6 ${className}`}
    >
      {title && (
        <h3 className={`text-lg font-semibold mb-4 ${currentVariant.title}`}>
          {title}
        </h3>
      )}
      <div className={currentLayout}>{features.map(renderFeature)}</div>
    </div>
  );
};
