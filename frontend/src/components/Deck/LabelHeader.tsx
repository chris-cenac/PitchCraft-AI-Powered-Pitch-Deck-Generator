import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { IconRenderer } from "./IconRenderer";

export const LabelHeader: React.FC<{
  text: string;

  subtext?: string;

  size?: "sm" | "md" | "lg" | "xl";

  align?: "left" | "center" | "right";

  underline?: boolean;

  color?: string;

  underlineColor?: string;

  icon?: string;

  className?: string;
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
}) => {
  const { theme } = useTheme();

  // Determine size classes
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
  };

  // Determine subtext size
  const subtextSize = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
  };

  // Alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  // Use custom color if provided, otherwise use theme-aware colors
  const textStyle = color ? { color } : {};
  const underlineStyle = underlineColor
    ? { backgroundColor: underlineColor }
    : {};

  return (
    <div className={`max-w-4xl ${alignClasses[align]} ${className}`}>
      <div className="flex items-center justify-center gap-3">
        {icon && (
          <div className="flex-shrink-0">
            <IconRenderer name={icon} />
          </div>
        )}
        <div>
          <h1
            className={`font-bold leading-tight tracking-tight ${
              sizeClasses[size]
            } ${!color && (theme === "dark" ? "text-white" : "text-gray-900")}`}
            style={textStyle}
          >
            {text}
          </h1>

          {underline && (
            <div
              className={`h-1 mt-2 mb-3 rounded-full ${
                !underlineColor &&
                (theme === "dark" ? "bg-blue-400" : "bg-blue-600")
              }`}
              style={{
                ...underlineStyle,
                width: size === "xl" ? "120px" : "100px",
              }}
            />
          )}
        </div>
      </div>

      {subtext && (
        <p
          className={`mt-2 ${subtextSize[size]} ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          } max-w-3xl`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};
