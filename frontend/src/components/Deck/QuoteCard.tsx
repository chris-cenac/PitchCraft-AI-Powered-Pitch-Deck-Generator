import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { IconRenderer } from "./IconRenderer";

export const QuoteCard: React.FC<{
  quote: string;
  author?: string;
  title?: string;
  company?: string;
  avatar?: string;
  variant?: "default" | "highlight" | "testimonial" | "statistic";
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({
  quote,
  author,
  title,
  company,
  avatar,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const { theme } = useTheme();

  const variantStyles = {
    default: {
      container: theme === "dark" ? "bg-gray-800" : "bg-white",
      border: theme === "dark" ? "border-gray-700" : "border-gray-200",
      quote: theme === "dark" ? "text-gray-300" : "text-gray-700",
      author: theme === "dark" ? "text-white" : "text-gray-900",
      title: theme === "dark" ? "text-gray-400" : "text-gray-600",
      icon: theme === "dark" ? "text-gray-600" : "text-gray-400",
    },
    highlight: {
      container:
        "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      border: "border-blue-200 dark:border-blue-700",
      quote: theme === "dark" ? "text-blue-200" : "text-blue-800",
      author: theme === "dark" ? "text-blue-100" : "text-blue-900",
      title: theme === "dark" ? "text-blue-300" : "text-blue-700",
      icon: "text-blue-400",
    },
    testimonial: {
      container:
        "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      border: "border-green-200 dark:border-green-700",
      quote: theme === "dark" ? "text-green-200" : "text-green-800",
      author: theme === "dark" ? "text-green-100" : "text-green-900",
      title: theme === "dark" ? "text-green-300" : "text-green-700",
      icon: "text-green-400",
    },
    statistic: {
      container:
        "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      border: "border-purple-200 dark:border-purple-700",
      quote: theme === "dark" ? "text-purple-200" : "text-purple-800",
      author: theme === "dark" ? "text-purple-100" : "text-purple-900",
      title: theme === "dark" ? "text-purple-300" : "text-purple-700",
      icon: "text-purple-400",
    },
  };

  const sizeStyles = {
    sm: {
      padding: "p-4",
      quote: "text-sm leading-relaxed",
      author: "text-sm font-medium",
      title: "text-xs",
      icon: 16,
    },
    md: {
      padding: "p-6",
      quote: "text-base leading-relaxed",
      author: "text-base font-medium",
      title: "text-sm",
      icon: 20,
    },
    lg: {
      padding: "p-8",
      quote: "text-lg leading-relaxed",
      author: "text-lg font-medium",
      title: "text-base",
      icon: 24,
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <div
      className={`${currentVariant.container} ${currentVariant.border} border rounded-xl shadow-lg ${currentSize.padding} ${className} relative`}
    >
      {/* Quote icon */}
      <div className={`${currentVariant.icon} absolute top-4 left-4`}>
        <IconRenderer name="FiQuote" size={currentSize.icon} />
      </div>

      {/* Quote content */}
      <div className="mt-6">
        <blockquote
          className={`${currentSize.quote} ${currentVariant.quote} italic font-medium`}
        >
          "{quote}"
        </blockquote>

        {/* Author info */}
        {(author || title || company) && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-current border-opacity-20">
            {avatar && (
              <div className="flex-shrink-0">
                <img
                  src={avatar}
                  alt={author || "Author"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              {author && (
                <p className={`${currentSize.author} ${currentVariant.author}`}>
                  {author}
                </p>
              )}
              {(title || company) && (
                <p className={`${currentSize.title} ${currentVariant.title}`}>
                  {title && company ? `${title}, ${company}` : title || company}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
