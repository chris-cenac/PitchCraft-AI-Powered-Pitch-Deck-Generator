import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
// These imports are required for Chart.js registration
import { Chart as ChartJS, registerables } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { useTheme } from "@/hooks/useTheme";

// Register all Chart.js components
ChartJS.register(...registerables);

/**
 * Enhanced DeckChart Component
 *
 * A robust chart component that automatically adapts to its container size
 * and integrates with the application's theme system.
 *
 * Features:
 * - Full width/height utilization
 * - Theme-aware styling (light/dark mode)
 * - Error handling with user-friendly messages
 * - Loading states
 * - Responsive design
 * - Type-safe props
 *
 * Example usage:
 * ```tsx
 * <DeckChart
 *   type="bar"
 *   data={{
 *     labels: ['Jan', 'Feb', 'Mar'],
 *     datasets: [{
 *       label: 'Sales',
 *       data: [12, 19, 3],
 *       backgroundColor: 'rgba(54, 162, 235, 0.5)',
 *     }]
 *   }}
 *   height="300px"
 *   className="my-custom-chart"
 * />
 * ```
 */

// Define supported chart types
export type SupportedChartType =
  | "bar"
  | "line"
  | "pie"
  | "doughnut"
  | "polarArea"
  | "radar"
  | "bubble"
  | "scatter";

// Enhanced props interface
interface DeckChartProps {
  /** Chart type to render */
  type: SupportedChartType;
  /** Chart data */
  data: ChartData<SupportedChartType>;
  /** Optional chart options */
  options?: ChartOptions<SupportedChartType>;
  /** Optional height override */
  height?: string | number;
  /** Optional width override */
  width?: string | number;
  /** Whether to show loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Custom CSS class */
  className?: string;
}

// Default chart options that work well with the theme
const getDefaultOptions = (
  type: SupportedChartType,
  theme: "light" | "dark"
): ChartOptions<SupportedChartType> => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#e2e8f0" : "#1a202c";
  const gridColor = isDark ? "#4a5568" : "#e2e8f0";
  const backgroundColor = isDark ? "#2d3748" : "#ffffff";

  const baseOptions: ChartOptions<SupportedChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: textColor,
          font: {
            size: 12,
            family: "'Inter', 'system-ui', sans-serif",
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: backgroundColor,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
      },
    },
  };

  // Type-specific options
  switch (type) {
    case "bar":
    case "line":
      return {
        ...baseOptions,
        scales: {
          x: {
            display: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                family: "'Inter', 'system-ui', sans-serif",
              },
            },
          },
          y: {
            display: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                family: "'Inter', 'system-ui', sans-serif",
              },
            },
          },
        },
      };

    case "radar":
      return {
        ...baseOptions,
        scales: {
          r: {
            display: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                family: "'Inter', 'system-ui', sans-serif",
              },
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 11,
                family: "'Inter', 'system-ui', sans-serif",
              },
            },
          },
        },
      };

    default:
      return baseOptions;
  }
};

// Error component
const ChartError: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
    <div className="text-center">
      <div className="text-red-500 dark:text-red-400 text-2xl mb-2">⚠️</div>
      <p className="text-red-700 dark:text-red-300 text-sm font-medium">
        Chart Error
      </p>
      <p className="text-red-600 dark:text-red-400 text-xs mt-1">{message}</p>
    </div>
  </div>
);

// Loading component
const ChartLoading: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Loading chart...
      </p>
    </div>
  </div>
);

/**
 * DeckChart Component
 *
 * Renders a Chart.js chart with enhanced features including theme integration,
 * error handling, and responsive design.
 *
 * @param props - Component props
 * @param props.type - Chart type (bar, line, pie, etc.)
 * @param props.data - Chart data object
 * @param props.options - Optional Chart.js options
 * @param props.height - Optional height override
 * @param props.width - Optional width override
 * @param props.loading - Whether to show loading state
 * @param props.error - Error message to display
 * @param props.className - Additional CSS classes
 */
export const DeckChart: React.FC<DeckChartProps> = ({
  type,
  data,
  options,
  height = "100%",
  width = "100%",
  loading = false,
  error,
  className = "",
}) => {
  const { theme } = useTheme();

  // Memoize chart options to prevent unnecessary re-renders
  const chartOptions = useMemo(() => {
    const defaultOptions = getDefaultOptions(type, theme);
    return {
      ...defaultOptions,
      ...options,
    };
  }, [type, theme, options]);

  // Handle error state
  if (error) {
    return <ChartError message={error} />;
  }

  // Handle loading state
  if (loading) {
    return <ChartLoading />;
  }

  // Validate data
  if (!data || !data.datasets || data.datasets.length === 0) {
    return <ChartError message="No data provided for chart" />;
  }

  // Validate chart type
  const validTypes: SupportedChartType[] = [
    "bar",
    "line",
    "pie",
    "doughnut",
    "polarArea",
    "radar",
    "bubble",
    "scatter",
  ];

  if (!validTypes.includes(type)) {
    return <ChartError message={`Unsupported chart type: ${type}`} />;
  }

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: typeof width === "number" ? `${width}px` : width,
      }}
    >
      <Chart
        type={type}
        data={data}
        options={chartOptions}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
