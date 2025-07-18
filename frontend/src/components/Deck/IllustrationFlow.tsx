import React from "react";
import * as FiIcons from "react-icons/fi";

export const IllustrationFlow: React.FC<{
  iconName: keyof typeof FiIcons;
  title: string;
  description: string;
  width?: number;
  color?: string;
  descriptionColor?: string;
}> = ({
  iconName,
  title,
  description,
  width = 120,
  color,
  descriptionColor,
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

  // Use provided colors or fallback to theme defaults via CSS variables
  const iconColor = color || "currentColor";
  const titleColor = color || "currentColor";
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
