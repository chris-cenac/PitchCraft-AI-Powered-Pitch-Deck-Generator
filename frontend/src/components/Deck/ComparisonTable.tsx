import React from "react";

export const ComparisonTable: React.FC<{
  headers: string[];
  rows: string[][];
  caption?: string;
  highlightCols?: number[];
  highlightRows?: number[];
  variant?:
    | "default"
    | "striped"
    | "bordered"
    | "highlighted"
    | "modern"
    | "enterprise"
    | "saas";
  className?: string;
  width?: string | number;
  height?: string | number;
}> = ({
  headers,
  rows,
  caption,
  highlightCols = [],
  highlightRows = [],
  variant = "default",
  className = "",
  width,
  height,
}) => {
  // Style helpers
  const getCellClass = (colIdx: number, rowIdx: number) => {
    let base = "px-4 py-4 text-base "; // Larger padding and font
    if (highlightCols.includes(colIdx)) base += " bg-blue-50 font-semibold ";
    if (highlightRows.includes(rowIdx)) base += " bg-green-50 font-semibold ";
    if (variant === "striped" && rowIdx % 2 === 1) base += " bg-gray-50 ";
    if (variant === "bordered" || variant === "enterprise")
      base += " border border-gray-200 ";
    if (variant === "modern") base += " border-b border-gray-100 ";
    if (variant === "saas") base += " border-b border-violet-100 ";
    if (
      variant === "highlighted" &&
      (highlightCols.includes(colIdx) || highlightRows.includes(rowIdx))
    )
      base += " bg-yellow-50 font-bold ";
    base += " text-gray-800 ";
    return base;
  };
  const tableClass =
    "w-full h-full min-w-full min-h-full rounded-xl shadow-lg overflow-hidden table-fixed " +
    (variant === "bordered" || variant === "enterprise"
      ? " border-2 border-gray-200 "
      : "") +
    (variant === "modern" ? " border border-gray-100 " : "") +
    (variant === "saas" ? " border border-violet-100 " : "") +
    (className || "");
  const thClass =
    "px-4 py-4 text-lg font-semibold bg-gray-100 text-gray-700 align-middle text-center " +
    (variant === "bordered" ? " border border-gray-200 " : "");
  const containerStyle: React.CSSProperties = {
    width: width || "100%",
    height: height || "100%",
    minWidth: 0,
    minHeight: 0,
    overflow: "hidden",
    background: "white",
    borderRadius: 16,
    boxShadow: "0 2px 16px 0 rgba(0,0,0,0.06)",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    alignItems: "stretch",
  };
  return (
    <div style={containerStyle} className="comparison-table-container">
      <table
        className={tableClass}
        style={{ width: "100%", height: "100%", tableLayout: "fixed" }}
      >
        {caption && (
          <caption className="text-xl font-semibold text-center py-2 text-gray-700 bg-gray-50">
            {caption}
          </caption>
        )}
        <thead style={{ width: "100%" }}>
          <tr>
            {headers.map((h, idx) => (
              <th
                key={idx}
                className={thClass}
                style={{ fontSize: "1.15em", verticalAlign: "middle" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ width: "100%" }}>
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className={
                variant === "striped" && rIdx % 2 === 1 ? "bg-gray-50" : ""
              }
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={
                    getCellClass(cIdx, rIdx) + " align-middle text-center"
                  }
                  style={{
                    fontSize: "1.1em",
                    height: `calc(100% / ${rows.length})`,
                    wordBreak: "break-word",
                    verticalAlign: "middle",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
