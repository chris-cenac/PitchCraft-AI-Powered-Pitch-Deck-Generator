// SlideRenderer.tsx
import React, { useRef, useState, useCallback } from "react";
import type { SlideItem } from "./slideTypes";
import { componentRegistry, isValidComponentName } from "./registry";
import { useTheme } from "@/hooks/useTheme";

const GRID_SIZE = 12;
const MIN_SIZE = 1;

interface SlideRendererProps {
  items: SlideItem[];
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  containerHeight?: string;
  containerWidth?: string;
  isEditing?: boolean;
  businessData?: Record<string, unknown>;
  onLayoutChange?: (
    index: number,
    layout: Partial<SlideItem["layout"]>
  ) => void;
}

// --- Resize Handle ---
const ResizeHandle: React.FC<{
  direction: "right" | "bottom" | "corner";
  onPointerDown: (e: React.PointerEvent) => void;
  style?: React.CSSProperties;
}> = ({ direction, onPointerDown, style }) => {
  const [hover, setHover] = useState(false);
  const { theme } = useTheme();
  const tooltip =
    direction === "right"
      ? "Resize horizontally"
      : direction === "bottom"
      ? "Resize vertically"
      : "Resize corner";
  const borderColor = hover
    ? theme === "dark"
      ? "#fff"
      : "#3182ce"
    : theme === "dark"
    ? "#e2e8f0"
    : "#cbd5e1";
  const backgroundColor = hover
    ? theme === "dark"
      ? "#3182ce"
      : "#3182ce"
    : theme === "dark"
    ? "rgba(255,255,255,0.12)"
    : "rgba(0,0,0,0.15)";
  const color = hover ? "#fff" : theme === "dark" ? "#fff" : "#64748b";
  return (
    <div
      onPointerDown={onPointerDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        ...style,
        zIndex: 20,
        cursor:
          direction === "right"
            ? "ew-resize"
            : direction === "bottom"
            ? "ns-resize"
            : "nwse-resize",
        background: backgroundColor,
        width: 18,
        height: 18,
        borderRadius: 4,
        border: `2px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hover ? "0 0 6px #3182ce55" : undefined,
        transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
      }}
    >
      <span
        style={{
          fontSize: 12,
          color,
          pointerEvents: "none",
        }}
      >
        {direction === "right" ? "↔" : direction === "bottom" ? "↕" : "↘"}
      </span>
      {hover && (
        <span
          style={{
            position: "absolute",
            top: -28,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "#fff",
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

// --- Draggable & Resizable Item ---
const DraggableResizableSlideItem: React.FC<{
  layout: SlideItem["layout"];
  onLayoutChange: (layout: Partial<SlideItem["layout"]>) => void;
  children: React.ReactNode;
  isEditing?: boolean;
  gridRef: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
}> = ({ layout, onLayoutChange, children, isEditing, gridRef, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState<
    null | "right" | "bottom" | "corner"
  >(null);
  const [startPointer, setStartPointer] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [startLayout, setStartLayout] = useState<SlideItem["layout"] | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null
  );
  const [ghost, setGhost] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // --- Unified Pointer Events ---
  const getGridMetrics = useCallback(() => {
    if (!gridRef.current) return null;
    const gridRect = gridRef.current.getBoundingClientRect();
    return {
      gridRect,
      colWidth: gridRect.width / GRID_SIZE,
      rowHeight: gridRect.height / GRID_SIZE,
    };
  }, [gridRef]);

  // --- Drag Start ---
  const onPointerDownDrag = (e: React.PointerEvent) => {
    if (!isEditing || !ref.current || !gridRef.current) return;
    e.stopPropagation();
    const compRect = ref.current.getBoundingClientRect();
    setDragging(true);
    setStartPointer({ x: e.clientX, y: e.clientY });
    setStartLayout({ ...layout });
    setDragOffset({
      x: e.clientX - compRect.left,
      y: e.clientY - compRect.top,
    });
    setGhost(null);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  // --- Resize Start ---
  const onPointerDownResize =
    (dir: "right" | "bottom" | "corner") => (e: React.PointerEvent) => {
      if (!isEditing || !gridRef.current) return;
      e.stopPropagation();
      setResizing(dir);
      setStartPointer({ x: e.clientX, y: e.clientY });
      setStartLayout({ ...layout });
      setGhost(null);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      document.body.style.userSelect = "none";
    };

  // --- Pointer Move ---
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isEditing || !gridRef.current || (!dragging && !resizing)) return;
    const metrics = getGridMetrics();
    if (!metrics || !startPointer || !startLayout) return;
    const { gridRect, colWidth, rowHeight } = metrics;
    if (dragging && dragOffset) {
      // --- Dragging ---
      const x = e.clientX - gridRect.left - dragOffset.x;
      const y = e.clientY - gridRect.top - dragOffset.y;
      let newCol = Math.round(x / colWidth) + 1;
      let newRow = Math.round(y / rowHeight) + 1;
      newCol = Math.max(
        1,
        Math.min(GRID_SIZE - (startLayout.columns - 1), newCol)
      );
      newRow = Math.max(
        1,
        Math.min(GRID_SIZE - ((startLayout.rows || 1) - 1), newRow)
      );
      setGhost({
        left: ((newCol - 1) * 100) / GRID_SIZE,
        top: ((newRow - 1) * 100) / GRID_SIZE,
        width: (startLayout.columns * 100) / GRID_SIZE,
        height: ((startLayout.rows || 1) * 100) / GRID_SIZE,
      });
      onLayoutChange({ columnStart: newCol, rowStart: newRow });
    } else if (resizing && startLayout) {
      // --- Resizing ---
      let newColumns = startLayout.columns;
      let newRows = startLayout.rows || 1;
      if (resizing === "right" || resizing === "corner") {
        const dx = e.clientX - startPointer.x;
        const widthPx = startLayout.columns * colWidth + dx;
        newColumns = Math.round(widthPx / colWidth);
        const colStart = startLayout.columnStart ?? 1;
        newColumns = Math.max(
          MIN_SIZE,
          Math.min(GRID_SIZE - (colStart - 1), newColumns)
        );
      }
      if (resizing === "bottom" || resizing === "corner") {
        const dy = e.clientY - startPointer.y;
        const heightPx = (startLayout.rows || 1) * rowHeight + dy;
        newRows = Math.round(heightPx / rowHeight);
        const rowStart = startLayout.rowStart ?? 1;
        newRows = Math.max(
          MIN_SIZE,
          Math.min(GRID_SIZE - (rowStart - 1), newRows)
        );
      }
      setGhost({
        left: (((startLayout.columnStart ?? 1) - 1) * 100) / GRID_SIZE,
        top: (((startLayout.rowStart ?? 1) - 1) * 100) / GRID_SIZE,
        width: (newColumns * 100) / GRID_SIZE,
        height: (newRows * 100) / GRID_SIZE,
      });
      onLayoutChange({ columns: newColumns, rows: newRows });
    }
  };

  // --- Pointer Up ---
  const onPointerUp = () => {
    if (dragging || resizing) {
      setDragging(false);
      setResizing(null);
      setStartPointer(null);
      setStartLayout(null);
      setDragOffset(null);
      setGhost(null);
      document.body.style.userSelect = "";
    }
  };

  // --- Render ---
  return (
    <div
      ref={ref}
      style={{
        ...style,
        zIndex: dragging || resizing ? 100 : 0,
        cursor: isEditing ? (dragging ? "grabbing" : "move") : undefined,
        pointerEvents: isEditing ? "auto" : "none",
        boxShadow:
          dragging || resizing
            ? "0 0 0 3px #3182ce, 0 2px 12px #3182ce44"
            : isEditing
            ? "0 0 0 2px #3182ce77"
            : undefined,
        transition: "box-shadow 0.2s",
        userSelect: "none",
      }}
      onPointerDown={isEditing ? onPointerDownDrag : undefined}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {children}
      {isEditing && (
        <>
          <div
            style={{
              position: "absolute",
              right: -9,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ResizeHandle
              direction="right"
              onPointerDown={onPointerDownResize("right")}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -9,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <ResizeHandle
              direction="bottom"
              onPointerDown={onPointerDownResize("bottom")}
            />
          </div>
          <div style={{ position: "absolute", right: -9, bottom: -9 }}>
            <ResizeHandle
              direction="corner"
              onPointerDown={onPointerDownResize("corner")}
            />
          </div>
        </>
      )}
      {ghost && (
        <div
          style={{
            position: "absolute",
            left: `${ghost.left}%`,
            top: `${ghost.top}%`,
            width: `${ghost.width}%`,
            height: `${ghost.height}%`,
            background: "#3182ce22",
            border: "2px dashed #3182ce",
            zIndex: 99,
            pointerEvents: "none",
            transition: "left 0.1s, top 0.1s, width 0.1s, height 0.1s",
          }}
        />
      )}
    </div>
  );
};

// --- Utility: Grid Classes ---
const getGridClasses = (spacing: number) => ({ gapClass: `gap-${spacing}` });

// --- Utility: Alignment Classes ---
const getAlignmentClasses = (
  align: "start" | "center" | "end" | "stretch" | undefined,
  justify: "start" | "center" | "end" | "stretch" | undefined
) => ({
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
});

// --- Main SlideRenderer ---
const SlideRenderer: React.FC<SlideRendererProps> = ({
  items,
  spacing = 4,
  containerHeight = "100%",
  containerWidth = "100%",
  isEditing = false,
  businessData,
  onLayoutChange,
}) => {
  const { theme } = useTheme();
  const { gapClass } = getGridClasses(spacing);
  const gridRef = useRef<HTMLDivElement>(null);

  // Render grid overlay for editing
  const gridLineColor =
    theme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(49, 130, 206, 0.3)";
  const gridOverlay = isEditing ? (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {[...Array(GRID_SIZE - 1)].map((_, i) => (
        <div
          key={"v-" + i}
          className="absolute top-0 bottom-0 border-l border-dashed"
          style={{
            left: `${((i + 1) * 100) / GRID_SIZE}%`,
            borderColor: gridLineColor,
          }}
        />
      ))}
      {[...Array(GRID_SIZE - 1)].map((_, i) => (
        <div
          key={"h-" + i}
          className="absolute left-0 right-0 border-t border-dashed"
          style={{
            top: `${((i + 1) * 100) / GRID_SIZE}%`,
            borderColor: gridLineColor,
          }}
        />
      ))}
    </div>
  ) : null;

  return (
    <div
      ref={gridRef}
      className={`relative w-full h-full ${gapClass}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
            : "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
      }}
    >
      {gridOverlay}
      {items.map((item, idx) => {
        const {
          columns,
          rows,
          columnStart,
          rowStart,
          align = "stretch",
          justify = "stretch",
        } = item.layout;
        const colSpan = Math.min(GRID_SIZE, Math.max(1, columns));
        const rowSpan = Math.max(1, rows || 1);
        const startCol = columnStart || 1;
        const startRow = rowStart || 1;
        const { alignItems, justifyContent } = getAlignmentClasses(
          align,
          justify
        );
        const Component = isValidComponentName(item.name)
          ? componentRegistry[item.name]
          : null;

        // Inject logo URL from businessData into LogoDisplay components
        let enhancedProps = { ...item.props };
        if (item.name === "LogoDisplay" && businessData) {
          enhancedProps = {
            ...enhancedProps,
            logoUrl:
              ((enhancedProps as Record<string, unknown>).logoUrl as string) ||
              (businessData.logoUrl as string),
            companyName:
              ((enhancedProps as Record<string, unknown>)
                .companyName as string) || (businessData.companyName as string),
          };
        }

        const content = Component ? (
          <div
            className={`flex ${alignItems} ${justifyContent} w-full h-full`}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              className={
                item.name === "DeckChart" ? "w-full h-full" : "inline-block"
              }
            >
              <Component {...enhancedProps} />
            </div>
          </div>
        ) : (
          <div
            className={`flex ${alignItems} ${justifyContent} bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-lg shadow-sm w-full h-full`}
          >
            <p className="text-sm font-medium">
              Invalid component: {item.name}
            </p>
          </div>
        );
        const gridPlacement = {
          position: "absolute" as const,
          left: `${((startCol - 1) * 100) / GRID_SIZE}%`,
          top: `${((startRow - 1) * 100) / GRID_SIZE}%`,
          width: `${(colSpan * 100) / GRID_SIZE}%`,
          height: `${(rowSpan * 100) / GRID_SIZE}%`,
        };
        return isEditing && onLayoutChange ? (
          <DraggableResizableSlideItem
            key={idx}
            layout={item.layout}
            onLayoutChange={(layout) => onLayoutChange(idx, layout)}
            isEditing={isEditing}
            gridRef={gridRef as React.RefObject<HTMLDivElement>}
            style={gridPlacement}
          >
            {content}
          </DraggableResizableSlideItem>
        ) : (
          <div
            key={idx}
            className={`absolute ${alignItems} ${justifyContent}`}
            style={gridPlacement}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default SlideRenderer;
