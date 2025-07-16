// GridItem.tsx
import React from "react";
import type { CSSProperties } from "react";

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number; // New prop for explicit position
  rowStart?: number; // New prop for explicit position
  className?: string;
  style?: CSSProperties;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan = 12,
  rowSpan,
  colStart,
  rowStart,
  className = "",
  style = {},
}) => {
  const columnSpan = Math.min(12, Math.max(1, colSpan));

  // Calculate placement properties
  const gridColumn = colStart
    ? `${colStart} / span ${columnSpan}`
    : `span ${columnSpan}`;

  const gridRow = rowStart
    ? `${rowStart} / span ${rowSpan || 1}`
    : rowSpan
    ? `span ${rowSpan}`
    : "auto";

  return (
    <div
      className={className}
      style={{
        ...style,
        gridColumn,
        gridRow,
      }}
    >
      {children}
    </div>
  );
};
