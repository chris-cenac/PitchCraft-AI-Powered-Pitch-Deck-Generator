import React from "react";
import * as FiIcons from "react-icons/fi";

export const IllustrationFlow: React.FC<{
  iconName: keyof typeof FiIcons;
  title: string;
  description: string;
  width?: number;
  color?: string;
  descriptionColor?: string;
  variant?: "default" | "process" | "timeline" | "tech";
}> = ({
  iconName,
  title,
  description,
  width = 120,
  color,
  descriptionColor,
  variant = "default",
}) => {
  // Ensure width is a valid number
  const safeWidth =
    typeof width === "number" && !isNaN(width) && width > 0 ? width : 120;
  // Determine sizes based on container width
  const iconSize = Math.max(24, safeWidth * 0.2);
  const titleSize = Math.max(16, safeWidth * 0.1);
  const descSize = Math.max(12, safeWidth * 0.08);

  const IconComponent = FiIcons[iconName] as React.FC<{
    size: number;
    color?: string;
  }>;
  const FinalIcon = IconComponent || FiIcons.FiCoffee;

  // Variant-specific styling
  const variantStyles: Record<
    string,
    { iconColor?: string; titleColor?: string }
  > = {
    default: {},
    process: { iconColor: "#3b82f6", titleColor: "#1f2937" },
    timeline: { iconColor: "#059669", titleColor: "#1f2937" },
    tech: { iconColor: "#6366f1", titleColor: "#1f2937" },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  // Use provided colors or fallback to variant defaults
  const iconColor = color || currentVariant.iconColor || "currentColor";
  const titleColor = color || currentVariant.titleColor || "currentColor";
  const descColor = descriptionColor || color || "gray";

  return (
    <div
      className="flex flex-col items-center justify-start text-center"
      style={{ width: safeWidth }}
    >
      <FinalIcon size={iconSize} color={iconColor} />
      <h3 style={{ fontSize: titleSize, marginTop: 8, color: titleColor }}>
        {title}
      </h3>
      <p style={{ fontSize: descSize, marginTop: 4, color: descColor }}>
        {description}
      </p>
    </div>
  );
};
