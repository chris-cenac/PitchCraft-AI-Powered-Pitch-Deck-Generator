// src/components/IconRenderer.tsx
import React from "react";
import * as FeatherIcons from "react-icons/fi";

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  size = 24,
  className = "",
}) => {
  // Clean and format icon name
  const formattedName = name.replace(/^Fi/, "");

  // @ts-expect-error - Dynamic icon lookup
  const IconComponent = FeatherIcons[`Fi${formattedName}`];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in react-icons/fi`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};
