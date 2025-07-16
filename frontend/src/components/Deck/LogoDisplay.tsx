import React, { useState } from "react";
import { BiBuilding } from "react-icons/bi";
export const LogoDisplay: React.FC<{
  /** URL of the logo image */
  logoUrl?: string | null;

  /** Company name for alt text and fallback */
  companyName?: string;

  /** Display variant */
  variant?: "standalone" | "with-text";

  /** Size preset */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /** Custom width in pixels */
  width?: number;

  /** Custom height in pixels */
  height?: number;

  /** Show circular background */
  circular?: boolean;

  /** Custom CSS classes */
  className?: string;

  /** Border style */
  border?: "none" | "light" | "medium" | "accent";
}> = ({
  logoUrl,
  companyName = "",
  variant = "standalone",
  size = "md",
  width,
  height,
  circular = false,
  className = "",
  border = "none",
}) => {
  const [imageError, setImageError] = useState(false);

  // Size presets
  const sizeMap = {
    xs: { width: 24, height: 24, textSize: "text-xs" },
    sm: { width: 40, height: 40, textSize: "text-sm" },
    md: { width: 64, height: 64, textSize: "text-base" },
    lg: { width: 80, height: 80, textSize: "text-lg" },
    xl: { width: 120, height: 120, textSize: "text-xl" },
  };

  // Border styles
  const borderMap = {
    none: "",
    light: "border border-gray-200",
    medium: "border-2 border-gray-300",
    accent: "border-2 border-blue-500",
  };

  const currentSize = sizeMap[size];
  const displayWidth = width || currentSize.width;
  const displayHeight = height || currentSize.height;

  // Generate initials from company name
  const getInitials = () => {
    if (!companyName) return <BiBuilding />;

    const words = companyName.split(" ");
    if (words.length === 1) return words[0].charAt(0);

    return words[0].charAt(0) + words[words.length - 1].charAt(0);
  };

  // Render logo image or fallback
  const renderLogo = () => {
    if (logoUrl && !imageError) {
      return (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className={`object-contain ${circular ? "rounded-full" : ""}`}
          onError={() => setImageError(true)}
          style={{
            width: displayWidth,
            height: displayHeight,
          }}
        />
      );
    }

    return (
      <div
        className={`
          flex items-center justify-center 
          bg-gradient-to-br from-blue-500 to-blue-700
          text-white font-bold
          ${circular ? "rounded-full" : "rounded-lg"}
        `}
        style={{
          width: displayWidth,
          height: displayHeight,
          fontSize: displayWidth * 0.4,
        }}
      >
        {getInitials()}
      </div>
    );
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${borderMap[border]} ${circular ? "rounded-full" : ""}`}>
        {renderLogo()}
      </div>

      {variant === "with-text" && companyName && (
        <div className="ml-4">
          <h3
            className={`font-bold ${currentSize.textSize}`}
            style={{ lineHeight: 1.2 }}
          >
            {companyName}
          </h3>
        </div>
      )}
    </div>
  );
};
