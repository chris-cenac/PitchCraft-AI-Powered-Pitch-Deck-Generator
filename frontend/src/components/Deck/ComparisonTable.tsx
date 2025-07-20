import React from "react";

interface ComparisonTableProps {
  headers?: string[];
  rows?: string[][];
  // For backward compatibility with AI output
  columns?: string[];
  data?: string[][];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = (props) => {
  // Accept both new and old formats
  const headers = props.headers || props.columns || [];
  const rows = props.rows || props.data || [];

  // Defensive: ensure headers and rows are arrays
  const safeHeaders = Array.isArray(headers) ? headers : [];
  const safeRows = Array.isArray(rows) ? rows : [];

  if (!safeHeaders.length || !safeRows.length) {
    return (
      <div className="text-red-500 p-4">Invalid comparison table data.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-secondary/20 dark:border-secondary-dark/20 rounded-lg">
        <thead>
          <tr>
            {safeHeaders.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-2 bg-surface dark:bg-surface-dark text-primary dark:text-accent font-semibold border-b border-secondary/20 dark:border-secondary-dark/20"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {Array.isArray(row)
                ? row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-4 py-2 border-b border-secondary/10 dark:border-secondary-dark/10 text-secondary dark:text-secondary-light"
                    >
                      {cell}
                    </td>
                  ))
                : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
