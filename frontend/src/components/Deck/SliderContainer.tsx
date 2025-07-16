// SlideContainer.tsx
import React from "react";
import { useTheme } from "@/hooks/useTheme";

export const SlideContainer: React.FC<{
  children: React.ReactNode;
  aspectRatio?: "16/9" | "4/3" | "1/1";
}> = ({ children, aspectRatio = "16/9" }) => {
  const { theme } = useTheme();
  const ratios = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  };

  return (
    <div
      className={`${ratios[aspectRatio]} w-full  mx-auto shadow-xl rounded-xl overflow-hidden`}
    >
      <div
        className={`w-full h-full ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
