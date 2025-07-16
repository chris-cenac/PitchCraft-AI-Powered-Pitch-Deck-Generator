import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SlideRenderer from "@/components/Deck/SlideRenderer";
import type { DeckSpec } from "@/components/Deck/slideTypes";
import { SlideContainer } from "@/components/Deck/SliderContainer";

const demoDeck: DeckSpec = {
  theme: {
    primaryColor: "#2563eb",
    secondaryColor: "#0ea5e9",
    accentColor: "#8b5cf6",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#f8fafc",
  },
  slides: [
    // Slide 1: Cover - Precisely positioned with grid placement
    {
      id: "cover",
      items: [
        // Logo (top center)
        {
          name: "LogoDisplay",
          props: {
            logoUrl: "https://via.placeholder.com/150/2563eb/ffffff?text=NX",
            companyName: "Nexus Analytics",
            size: "xl",
            circular: true,
            border: "accent",
          },
          layout: {
            columns: 4,
            rows: 2,
            columnStart: 5,
            rowStart: 1,
            align: "center",
            justify: "center",
          },
        },

        // Company name (below logo)
        {
          name: "LabelHeader",
          props: {
            text: "Nexus Analytics",
            size: "xl",
            underline: false,
            color: "#2563eb",
          },
          layout: {
            columns: 8,
            rows: 1,
            columnStart: 3,
            rowStart: 3,
            align: "center",
            justify: "center",
          },
        },

        // Tagline (below company name)
        {
          name: "LabelHeader",
          props: {
            text: "AI-Powered Business Intelligence Platform",
            size: "lg",
            underline: false,
            color: "#64748b",
          },
          layout: {
            columns: 10,
            rows: 1,
            columnStart: 2,
            rowStart: 4,
            align: "center",
            justify: "center",
          },
        },

        // Value proposition 1 (left)
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiBarChart2",
            title: "Data-Driven Decisions",
            description: "Transform raw data into actionable insights",
            width: 300,
            color: "#2563eb",
          },
          layout: {
            columns: 4,
            rows: 3,
            columnStart: 1,
            rowStart: 5,
            align: "start",
            justify: "center",
          },
        },

        // Value proposition 2 (center)
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiTrendingUp",
            title: "Predictive Analytics",
            description: "Forecast market trends before they happen",
            width: 300,
            color: "#8b5cf6",
          },
          layout: {
            columns: 4,
            rows: 3,
            columnStart: 5,
            rowStart: 5,
            align: "start",
            justify: "center",
          },
        },

        // Value proposition 3 (right)
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiShield",
            title: "Enterprise Security",
            description: "Military-grade encryption & compliance",
            width: 300,
            color: "#0ea5e9",
          },
          layout: {
            columns: 4,
            rows: 3,
            columnStart: 9,
            rowStart: 5,
            align: "start",
            justify: "center",
          },
        },

        // Footer
        {
          name: "LabelHeader",
          props: {
            text: "Q4 2025 Investor Presentation",
            size: "sm",
            align: "center",
            color: "#64748b",
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 8,
            align: "center",
            justify: "end",
          },
        },
      ],
    },

    // Slide 2: Problem & Solution - Using precise grid positioning
    {
      id: "problem-solution",
      items: [
        // Header
        {
          name: "LabelHeader",
          props: {
            text: "The Data Dilemma",
            size: "xl",
            underline: true,
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 1,
            align: "center",
            justify: "center",
          },
        },

        // Subheader
        {
          name: "LabelHeader",
          props: {
            text: "Businesses struggle with information overload",
            size: "lg",
            color: "#64748b",
          },
          layout: {
            columns: 10,
            rows: 1,
            columnStart: 2,
            rowStart: 2,
            align: "center",
            justify: "center",
          },
        },

        // Chart (left side)
        {
          name: "DeckChart",
          props: {
            type: "pie",
            data: {
              labels: [
                "Unstructured Data",
                "Manual Processing",
                "Inaccurate Insights",
                "Actionable Data",
              ],
              datasets: [
                {
                  data: [45, 25, 20, 10],
                  backgroundColor: ["#ef4444", "#f97316", "#eab308", "#22c55e"],
                },
              ],
            },
            options: {
              plugins: {
                title: { display: true, text: "Data Utilization Breakdown" },
                legend: { position: "right" },
              },
            },
          },
          layout: {
            columns: 5,
            rows: 6,
            columnStart: 1,
            rowStart: 3,
            align: "center",
            justify: "center",
          },
        },

        // Solution header (right side)
        {
          name: "LabelHeader",
          props: {
            text: "Our Solution",
            size: "lg",
            align: "left",
            underline: true,
          },
          layout: {
            columns: 7,
            rows: 1,
            columnStart: 6,
            rowStart: 3,
            align: "start",
            justify: "start",
          },
        },

        // Solution 1
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiTarget",
            title: "Automated Insights",
            description: "Transform raw data into strategic intelligence",
            width: 300,
            color: "#2563eb",
          },
          layout: {
            columns: 7,
            rows: 2,
            columnStart: 6,
            rowStart: 4,
            align: "start",
            justify: "start",
          },
        },

        // Solution 2
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiZap",
            title: "Real-time Analysis",
            description: "Process data as it's generated with AI models",
            width: 300,
            color: "#8b5cf6",
          },
          layout: {
            columns: 7,
            rows: 2,
            columnStart: 6,
            rowStart: 6,
            align: "start",
            justify: "start",
          },
        },
      ],
    },

    // Slide 3: Market Analysis - Using grid positioning for side-by-side layout
    {
      id: "market-analysis",
      items: [
        // Header
        {
          name: "LabelHeader",
          props: {
            text: "Competitive Landscape",
            size: "xl",
            underline: true,
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 1,
            align: "center",
            justify: "center",
          },
        },

        // Table (left)
        {
          name: "ComparisonTable",
          props: {
            headers: ["Feature", "Nexus", "Competitor A", "Competitor B"],
            rows: [
              ["Real-time Analytics", "✓", "✓", "Limited"],
              ["Predictive Modeling", "✓", "✗", "Basic"],
              ["Custom Dashboards", "✓", "✓", "✓"],
              ["AI Recommendations", "✓", "✗", "✗"],
              ["Data Source Connections", "Unlimited", "5", "10"],
              ["Price (monthly)", "$299", "$499", "$199"],
            ],
          },
          layout: {
            columns: 7,
            rows: 5,
            columnStart: 1,
            rowStart: 2,
            align: "start",
            justify: "start",
          },
        },

        // Chart (right)
        {
          name: "DeckChart",
          props: {
            type: "bar",
            data: {
              labels: ["2021", "2022", "2023", "2024"],
              datasets: [
                {
                  label: "Market Growth",
                  data: [12, 19, 28, 41],
                  backgroundColor: "#2563eb",
                },
              ],
            },
            options: {
              plugins: {
                title: { display: true, text: "BI Market Growth (%)" },
              },
            },
          },
          layout: {
            columns: 5,
            rows: 5,
            columnStart: 8,
            rowStart: 2,
            align: "center",
            justify: "center",
          },
        },

        // Key takeaway
        {
          name: "LabelHeader",
          props: {
            text: "Nexus captures 28% more actionable insights than competitors",
            size: "md",
            align: "center",
            color: "#22c55e",
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 7,
            align: "center",
            justify: "center",
          },
        },
      ],
    },

    // Slide 4: Financial Projections - Centered visualization
    {
      id: "financials",
      items: [
        // Header
        {
          name: "LabelHeader",
          props: {
            text: "Financial Projections",
            size: "xl",
            underline: true,
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 1,
            align: "center",
            justify: "center",
          },
        },

        // Chart
        {
          name: "DeckChart",
          props: {
            type: "line",
            data: {
              labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
              datasets: [
                {
                  label: "Projected Revenue",
                  data: [125000, 185000, 240000, 320000],
                  borderColor: "#2563eb",
                  tension: 0.3,
                },
                {
                  label: "Actual Revenue",
                  data: [118000, 172000, 210000, 295000],
                  borderColor: "#8b5cf6",
                  tension: 0.3,
                },
              ],
            },
            options: {
              plugins: {
                title: { display: true, text: "Revenue Projections ($)" },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value: number) => `$${value / 1000}k`,
                  },
                },
              },
            },
          },
          layout: {
            columns: 10,
            rows: 5,
            columnStart: 2,
            rowStart: 2,
            align: "center",
            justify: "center",
          },
        },

        // Key metric
        {
          name: "LabelHeader",
          props: {
            text: "$1.2M ARR by Q4 2024 | 45% YoY Growth",
            size: "lg",
            align: "center",
            color: "#0ea5e9",
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 7,
            align: "center",
            justify: "center",
          },
        },
      ],
    },

    // Slide 5: Team & Contact - Grid-based team layout
    {
      id: "team-contact",
      items: [
        // Header
        {
          name: "LabelHeader",
          props: {
            text: "Our Leadership Team",
            size: "xl",
            underline: true,
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 1,
            align: "center",
            justify: "center",
          },
        },

        // Subheader
        {
          name: "LabelHeader",
          props: {
            text: "Experienced professionals with deep industry expertise",
            size: "md",
            color: "#64748b",
          },
          layout: {
            columns: 10,
            rows: 1,
            columnStart: 2,
            rowStart: 2,
            align: "center",
            justify: "center",
          },
        },

        // Team member 1
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiUser",
            title: "Alex Johnson",
            description: "CEO - Former Data Science Lead at Google",
            width: 250,
          },
          layout: {
            columns: 3,
            rows: 3,
            columnStart: 1,
            rowStart: 3,
            align: "start",
            justify: "start",
          },
        },

        // Team member 2
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiUser",
            title: "Maria Chen",
            description: "CTO - AI Research PhD from Stanford",
            width: 250,
          },
          layout: {
            columns: 3,
            rows: 3,
            columnStart: 4,
            rowStart: 3,
            align: "start",
            justify: "start",
          },
        },

        // Team member 3
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiUser",
            title: "David Kim",
            description: "CFO - Former VP Finance at Salesforce",
            width: 250,
          },
          layout: {
            columns: 3,
            rows: 3,
            columnStart: 7,
            rowStart: 3,
            align: "start",
            justify: "start",
          },
        },

        // Team member 4
        {
          name: "IllustrationFlow",
          props: {
            iconName: "FiUser",
            title: "Sarah Williams",
            description: "Head of Product - Ex-Microsoft PM",
            width: 250,
          },
          layout: {
            columns: 3,
            rows: 3,
            columnStart: 10,
            rowStart: 3,
            align: "start",
            justify: "start",
          },
        },

        // Contact header
        {
          name: "LabelHeader",
          props: {
            text: "Get in Touch",
            size: "lg",
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 6,
            align: "center",
            justify: "center",
          },
        },

        // Contact details
        {
          name: "LabelHeader",
          props: {
            text: "contact@nexusanalytics.io | (415) 555-0123",
            size: "md",
            color: "#0ea5e9",
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 7,
            align: "center",
            justify: "center",
          },
        },

        // Address
        {
          name: "LabelHeader",
          props: {
            text: "San Francisco, CA | www.nexusanalytics.io",
            size: "sm",
            color: "#64748b",
          },
          layout: {
            columns: 12,
            rows: 1,
            columnStart: 1,
            rowStart: 8,
            align: "center",
            justify: "center",
          },
        },
      ],
    },
  ],
};

const DeckEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const deck = demoDeck;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = deck.slides[currentIndex];

  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentIndex((i) => Math.min(i + 1, deck.slides.length - 1));

  return (
    <div className="flex flex-col items-center p-4">
      <SlideContainer aspectRatio="16/9">
        <SlideRenderer
          items={currentSlide.items}
          spacing={3} // 0-10 scale
          containerWidth="100%"
          containerHeight="100%"
        />
      </SlideContainer>

      {/* Bottom Navigation Bar */}
      <nav className="fixed z-50 w-full max-w-lg left-1/2 transform -translate-x-1/2 bottom-4 h-16 bg-white border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full grid-cols-5 mx-auto">
          <button
            onClick={() => setCurrentIndex(0)}
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {/* Home Icon */}
            <svg
              className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">First Slide</span>
          </button>

          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {/* Prev Icon */}
            <svg
              className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous Slide</span>
          </button>

          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                /* New Slide Action */
              }}
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
              <span className="sr-only">New Slide</span>
            </button>
          </div>

          <button
            onClick={goNext}
            disabled={currentIndex === deck.slides.length - 1}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {/* Next Icon */}
            <svg
              className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next Slide</span>
          </button>

          <button
            onClick={() => {
              /* Profile Action */
            }}
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            {/* Profile Icon */}
            <svg
              className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DeckEditor;
