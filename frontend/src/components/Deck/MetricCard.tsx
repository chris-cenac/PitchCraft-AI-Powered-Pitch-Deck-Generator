import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { IconRenderer } from "./IconRenderer";

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const { theme } = useTheme();

  const variantStyles = {
    default: {
      bg: theme === "dark" ? "bg-gray-800" : "bg-white",
      border: theme === "dark" ? "border-gray-700" : "border-gray-200",
      text: theme === "dark" ? "text-white" : "text-gray-900",
      subtitle: theme === "dark" ? "text-gray-400" : "text-gray-600",
      icon: theme === "dark" ? "text-blue-400" : "text-blue-600",
    },
    primary: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      border: "border-blue-500",
      text: "text-white",
      subtitle: "text-blue-100",
      icon: "text-blue-200",
    },
    success: {
      bg: "bg-gradient-to-br from-green-500 to-green-600",
      border: "border-green-500",
      text: "text-white",
      subtitle: "text-green-100",
      icon: "text-green-200",
    },
    warning: {
      bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      border: "border-yellow-500",
      text: "text-white",
      subtitle: "text-yellow-100",
      icon: "text-yellow-200",
    },
    danger: {
      bg: "bg-gradient-to-br from-red-500 to-red-600",
      border: "border-red-500",
      text: "text-white",
      subtitle: "text-red-100",
      icon: "text-red-200",
    },
  };

  const sizeStyles = {
    sm: {
      padding: "p-4",
      title: "text-sm font-medium",
      value: "text-2xl font-bold",
      subtitle: "text-xs",
      icon: 16,
    },
    md: {
      padding: "p-6",
      title: "text-base font-medium",
      value: "text-3xl font-bold",
      subtitle: "text-sm",
      icon: 20,
    },
    lg: {
      padding: "p-8",
      title: "text-lg font-medium",
      value: "text-4xl font-bold",
      subtitle: "text-base",
      icon: 24,
    },
  };

  const trendStyles = {
    up: {
      color: "text-green-500",
      icon: "FiTrendingUp",
    },
    down: {
      color: "text-red-500",
      icon: "FiTrendingDown",
    },
    neutral: {
      color: "text-gray-500",
      icon: "FiMinus",
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];
  const currentTrend = trend ? trendStyles[trend] : null;

  return (
    <div
      className={`${currentVariant.bg} ${currentVariant.border} border rounded-xl shadow-lg ${currentSize.padding} ${className} transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <div className={`${currentVariant.icon}`}>
                <IconRenderer name={icon} size={currentSize.icon} />
              </div>
            )}
            <h3 className={`${currentSize.title} ${currentVariant.text}`}>
              {title}
            </h3>
          </div>

          <div className={`${currentSize.value} ${currentVariant.text} mb-1`}>
            {value}
          </div>

          {subtitle && (
            <p className={`${currentSize.subtitle} ${currentVariant.subtitle}`}>
              {subtitle}
            </p>
          )}
        </div>

        {trend && currentTrend && (
          <div className="flex items-center gap-1">
            <IconRenderer
              name={currentTrend.icon}
              size={16}
              className={currentTrend.color}
            />
            {trendValue && (
              <span className={`text-sm font-medium ${currentTrend.color}`}>
                {trendValue}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
