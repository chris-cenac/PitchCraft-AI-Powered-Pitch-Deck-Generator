// SlideRenderer.tsx
import React from "react";
import type { SlideItem } from "./slideTypes";
import { componentRegistry, isValidComponentName } from "./registry";
import { useTheme } from "@/hooks/useTheme";

interface SlideRendererProps {
  items: SlideItem[];
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  containerHeight?: string;
  containerWidth?: string;
}

// Utility to get grid classes
const getGridClasses = (spacing: number) => {
  return {
    gapClass: `gap-${spacing}`,
  };
};

// Utility to get alignment classes
const getAlignmentClasses = (
  align: "start" | "center" | "end" | "stretch" | undefined,
  justify: "start" | "center" | "end" | "stretch" | undefined
) => {
  return {
    alignItems: align
      ? {
          start: "items-start",
          center: "items-center",
          end: "items-end",
          stretch: "items-stretch",
        }[align]
      : "items-stretch",
    justifyContent: justify
      ? {
          start: "justify-start",
          center: "justify-center",
          end: "justify-end",
          stretch: "justify-stretch",
        }[justify]
      : "justify-stretch",
  };
};

const SlideRenderer: React.FC<SlideRendererProps> = ({
  items,
  spacing = 4,
  containerHeight = "100%",
  containerWidth = "100%",
}) => {
  const { theme } = useTheme();
  const { gapClass } = getGridClasses(spacing);

  return (
    <div
      className={`grid grid-cols-12 ${gapClass} w-full h-full relative overflow-hidden`}
      style={{
        height: containerHeight,
        width: containerWidth,
        gridTemplateRows: "repeat(12, 1fr)",
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
            : "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
      }}
    >
      {/* Background pattern for visual interest */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${
            theme === "dark" ? "#4a5568" : "#a0aec0"
          } 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {items.map((item, idx) => {
        const {
          columns,
          rows,
          columnStart,
          rowStart,
          align = "stretch",
          justify = "stretch",
        } = item.layout;

        const colSpan = Math.min(12, Math.max(1, columns));
        const rowSpan = Math.max(1, rows || 1);

        // Calculate placement properties
        // If columnStart is specified, use it; otherwise start from 1
        const startCol = columnStart || 1;
        const endCol = startCol + colSpan - 1;
        const gridColumn = `${startCol} / ${endCol + 1}`;

        // If rowStart is specified, use it; otherwise start from 1
        const startRow = rowStart || 1;
        const endRow = startRow + rowSpan - 1;
        const gridRow = `${startRow} / ${endRow + 1}`;

        // Get alignment classes
        const { alignItems, justifyContent } = getAlignmentClasses(
          align,
          justify
        );

        // Validate component
        if (!isValidComponentName(item.name)) {
          return (
            <div
              key={idx}
              className={`flex ${alignItems} ${justifyContent} bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-lg shadow-sm`}
              style={{ gridColumn, gridRow }}
            >
              <p className="text-sm font-medium">
                Invalid component: {item.name}
              </p>
            </div>
          );
        }

        const Component = componentRegistry[item.name];

        return (
          <div
            key={idx}
            className={`flex ${alignItems} ${justifyContent}`}
            style={{ gridColumn, gridRow }}
          >
            <div
              className={
                item.name === "DeckChart" ? "w-full h-full" : "inline-block"
              }
            >
              <Component {...item.props} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SlideRenderer;
