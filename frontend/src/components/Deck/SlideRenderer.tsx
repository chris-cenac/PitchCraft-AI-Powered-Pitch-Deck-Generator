// SlideRenderer.tsx
import React from "react";
import type { SlideItem } from "./slideTypes";
import { componentRegistry, isValidComponentName } from "./registry";
import { useTheme } from "@/hooks/useTheme";

interface SlideRendererProps {
  items: SlideItem[];
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  rowHeight?: "auto" | "dense" | number;
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
  rowHeight = "auto",
  containerHeight = "100%",
  containerWidth = "100%",
}) => {
  const { theme } = useTheme();
  const { gapClass } = getGridClasses(spacing);

  return (
    <div
      className={`grid grid-cols-12 ${gapClass} w-full h-full`}
      style={{
        height: containerHeight,
        width: containerWidth,
        gridAutoRows:
          rowHeight === "dense"
            ? "min-content"
            : rowHeight === "auto"
            ? "auto"
            : `${rowHeight}px`,
        backgroundColor: theme === "dark" ? "#1a202c" : "#f7fafc",
      }}
    >
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
        const gridColumn = columnStart
          ? `${columnStart} / span ${colSpan}`
          : `span ${colSpan}`;

        const gridRow = rowStart
          ? `${rowStart} / span ${rowSpan}`
          : `span ${rowSpan}`;

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
              className={`flex ${alignItems} ${justifyContent} bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded`}
              style={{ gridColumn, gridRow }}
            >
              <p>Invalid component: {item.name}</p>
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
            <Component {...item.props} />
          </div>
        );
      })}
    </div>
  );
};

export default SlideRenderer;
