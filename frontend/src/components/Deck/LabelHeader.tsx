import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { IconRenderer } from "./IconRenderer";

export const LabelHeader: React.FC<{
  text: string;
  subtext?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "left" | "center" | "right";
  underline?: boolean;
  color?: string;
  underlineColor?: string;
  icon?: string;
  className?: string;
  gradient?: boolean;
  variant?:
    | "default"
    | "hero"
    | "section"
    | "accent"
    | "enterprise"
    | "product"
    | "tech"
    | "saas";
}> = ({
  text,
  subtext,
  size = "md",
  align = "center",
  underline = true,
  color,
  underlineColor,
  icon,
  className = "",
  gradient = false,
  variant = "default",
}) => {
  const { theme } = useTheme();

  // Enhanced size classes with better typography
  const sizeClasses = {
    sm: "text-2xl md:text-3xl font-bold",
    md: "text-3xl md:text-4xl font-bold",
    lg: "text-4xl md:text-5xl font-bold",
    xl: "text-5xl md:text-6xl font-bold",
    "2xl": "text-6xl md:text-7xl font-bold",
  };

  // Enhanced subtext size
  const subtextSize = {
    sm: "text-sm md:text-base font-medium",
    md: "text-base md:text-lg font-medium",
    lg: "text-lg md:text-xl font-medium",
    xl: "text-xl md:text-2xl font-medium",
    "2xl": "text-2xl md:text-3xl font-medium",
  };

  // Alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  // Variant styles
  const variantStyles = {
    default: {
      text: theme === "dark" ? "text-white" : "text-gray-900",
      subtext: theme === "dark" ? "text-gray-300" : "text-gray-600",
      underline: theme === "dark" ? "bg-blue-400" : "bg-blue-600",
    },
    hero: {
      text: gradient
        ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        : theme === "dark"
        ? "text-white"
        : "text-gray-900",
      subtext: theme === "dark" ? "text-gray-300" : "text-gray-600",
      underline: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    section: {
      text: theme === "dark" ? "text-blue-400" : "text-blue-600",
      subtext: theme === "dark" ? "text-gray-400" : "text-gray-500",
      underline: theme === "dark" ? "bg-blue-400" : "bg-blue-600",
    },
    accent: {
      text: theme === "dark" ? "text-purple-400" : "text-purple-600",
      subtext: theme === "dark" ? "text-gray-400" : "text-gray-500",
      underline: theme === "dark" ? "bg-purple-400" : "bg-purple-600",
    },
    enterprise: {
      text: theme === "dark" ? "text-blue-400" : "text-blue-700",
      subtext: theme === "dark" ? "text-gray-400" : "text-gray-500",
      underline: theme === "dark" ? "bg-blue-400" : "bg-blue-700",
    },
    product: {
      text: theme === "dark" ? "text-purple-400" : "text-purple-600",
      subtext: theme === "dark" ? "text-gray-400" : "text-gray-500",
      underline: theme === "dark" ? "bg-purple-400" : "bg-purple-600",
    },
    tech: {
      text: theme === "dark" ? "text-indigo-400" : "text-indigo-600",
      subtext: theme === "dark" ? "text-gray-400" : "text-gray-500",
      underline: theme === "dark" ? "bg-indigo-400" : "bg-indigo-600",
    },
    saas: {
      text: theme === "dark" ? "text-violet-400" : "text-violet-600",
      subtext: theme === "dark" ? "text-gray-400" : "text-gray-500",
      underline: theme === "dark" ? "bg-violet-400" : "bg-violet-600",
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  // Use custom color if provided, otherwise use variant colors
  const textStyle = color ? { color } : {};
  const underlineStyle = underlineColor
    ? { backgroundColor: underlineColor }
    : {};

  return (
    <div className={`max-w-5xl ${alignClasses[align]} ${className}`}>
      <div className="flex items-center justify-center gap-4">
        {icon && (
          <div className="flex-shrink-0">
            <div
              className={`p-2 rounded-full ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <IconRenderer
                name={icon}
                size={
                  size === "2xl"
                    ? 32
                    : size === "xl"
                    ? 28
                    : size === "lg"
                    ? 24
                    : 20
                }
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <h1
            className={`leading-tight tracking-tight ${sizeClasses[size]} ${
              !color ? currentVariant.text : ""
            }`}
            style={textStyle}
          >
            {text}
          </h1>

          {underline && (
            <div
              className={`h-1 mt-3 mb-4 rounded-full transition-all duration-300 ${
                !underlineColor ? currentVariant.underline : ""
              }`}
              style={{
                ...underlineStyle,
                width:
                  size === "2xl"
                    ? "140px"
                    : size === "xl"
                    ? "120px"
                    : size === "lg"
                    ? "100px"
                    : "80px",
              }}
            />
          )}
        </div>
      </div>

      {subtext && (
        <p
          className={`mt-3 ${subtextSize[size]} ${currentVariant.subtext} max-w-4xl leading-relaxed`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};
