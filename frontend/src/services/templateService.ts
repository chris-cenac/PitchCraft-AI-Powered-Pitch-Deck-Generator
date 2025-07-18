import type { DeckSpec } from "@/components/Deck/slideTypes";

export interface PitchDeckTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  slideCount: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  slides: string[];
  bestFor: string[];
  features: string[];
  generateDeck: () => DeckSpec;
}

// Template data
export const pitchDeckTemplates: PitchDeckTemplate[] = [
  {
    id: "comprehensive-pitch-deck",
    name: "Comprehensive Pitch Deck",
    category: "fundraising",
    description:
      "Professional pitch deck template with excellent layout showcasing all components - perfect for startup fundraising and investor presentations",
    slideCount: 9,
    duration: "15-20 minutes",
    difficulty: "Advanced",
    slides: [
      "Title Slide",
      "The Problem",
      "Our Solution",
      "Market Opportunity",
      "Competitive Advantage",
      "Business Model",
      "Financial Projections",
      "Team",
      "Funding Ask",
    ],
    bestFor: [
      "Startup fundraising",
      "Series A",
      "Tech startups",
      "B2B SaaS",
      "Investor presentations",
    ],
    features: [
      "All components showcased",
      "Perfect grid layout",
      "Professional design",
      "Investor-focused content",
      "Data-driven narrative",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#3182ce",
        secondaryColor: "#2d3748",
        accentColor: "#38a169",
        backgroundColor: "#f7fafc",
        fontFamily: "Inter, system-ui, sans-serif",
        headingFontFamily: "Inter, system-ui, sans-serif",
      },
      slides: [
        {
          id: "slide-1",
          title: "Title Slide",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "TechFlow Solutions",
                subtext: "Revolutionizing Enterprise Workflow Automation",
                size: "2xl",
                variant: "hero",
                gradient: true,
                align: "center",
                color: "#1a365d",
                icon: "FiZap",
              },
              layout: {
                columns: 12,
                rows: 3,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LogoDisplay",
              props: {
                companyName: "TechFlow",
                variant: "standalone",
                size: "xl",
                circular: false,
                border: "accent",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Founded",
                value: "2023",
                subtitle: "Year Established",
                icon: "FiCalendar",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 3,
                rows: 1,
                columnStart: 2,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Team Size",
                value: "15",
                subtitle: "Full-time Employees",
                icon: "FiUsers",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 3,
                rows: 1,
                columnStart: 6,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Location",
                value: "San Francisco",
                subtitle: "Headquarters",
                icon: "FiMapPin",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 3,
                rows: 1,
                columnStart: 10,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-2",
          title: "The Problem",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "The Problem We're Solving",
                subtext:
                  "Enterprise workflow inefficiencies cost billions annually",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 2,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiAlertTriangle",
                title: "Manual Processes",
                description:
                  "80% of enterprises still rely on manual, error-prone workflows",
                color: "#e53e3e",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 1,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiClock",
                title: "Time Waste",
                description:
                  "Employees spend 40% of their time on repetitive tasks",
                color: "#d69e2e",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 5,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiDollarSign",
                title: "High Costs",
                description:
                  "$2.7 trillion lost annually due to inefficient processes",
                color: "#38a169",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 9,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "bar",
                data: {
                  labels: [
                    "Manual Processes",
                    "Time Waste",
                    "Error Rate",
                    "Cost Impact",
                  ],
                  datasets: [
                    {
                      label: "Impact Score (1-10)",
                      data: [8, 7, 9, 8],
                      backgroundColor: "#e53e3e",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 6,
                columnStart: 3,
                rowStart: 8,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-3",
          title: "Our Solution",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "AI-Powered Workflow Automation",
                subtext: "Intelligent automation that learns and adapts",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Features",
                features: [
                  {
                    text: "AI-powered process learning",
                    icon: "FiBrain",
                    highlight: true,
                  },
                  {
                    text: "Real-time workflow optimization",
                    icon: "FiZap",
                    highlight: true,
                  },
                  {
                    text: "Seamless integration with existing systems",
                    icon: "FiLink",
                    highlight: false,
                  },
                  {
                    text: "Advanced analytics and reporting",
                    icon: "FiBarChart2",
                    highlight: false,
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 3,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "TechFlow reduced our processing time by 75% and eliminated 90% of manual errors.",
                author: "Sarah Chen",
                title: "CTO",
                company: "GlobalTech Inc.",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-4",
          title: "Market Opportunity",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Massive Market Opportunity",
                subtext: "The workflow automation market is exploding",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Total Addressable Market",
                value: "$45B",
                subtitle: "Global workflow automation market",
                icon: "FiGlobe",
                trend: "up",
                trendValue: "+23% YoY",
                variant: "primary",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Serviceable Market",
                value: "$12B",
                subtitle: "Enterprise segment we target",
                icon: "FiTarget",
                trend: "up",
                trendValue: "+18% YoY",
                variant: "success",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Target Market",
                value: "$2.8B",
                subtitle: "Immediate opportunity",
                icon: "FiTrendingUp",
                trend: "up",
                trendValue: "+35% YoY",
                variant: "warning",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "line",
                data: {
                  labels: ["2023", "2024", "2025", "2026", "2027"],
                  datasets: [
                    {
                      label: "Market Growth ($B)",
                      data: [45, 55, 68, 84, 103],
                      backgroundColor: "#3182ce",
                      borderColor: "#3182ce",
                    },
                  ],
                },
              },
              layout: {
                columns: 10,
                rows: 5,
                columnStart: 2,
                rowStart: 7,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-5",
          title: "Competitive Advantage",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Why We'll Win",
                subtext: "Competitive advantages that set us apart",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Feature", "Competitors", "TechFlow"],
                rows: [
                  ["AI Learning", "Basic", "Advanced ML"],
                  ["Integration", "Limited", "Universal"],
                  ["Analytics", "Standard", "Predictive"],
                  ["Pricing", "High", "Competitive"],
                  ["Support", "Email Only", "24/7 Live"],
                ],
              },
              layout: {
                columns: 10,
                rows: 6,
                columnStart: 2,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-6",
          title: "Business Model",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Scalable Revenue Model",
                subtext: "Multiple revenue streams with strong unit economics",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 7,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Annual Recurring Revenue",
                value: "$2.5M",
                subtitle: "Current ARR",
                icon: "FiDollarSign",
                trend: "up",
                trendValue: "+300% YoY",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Customer Lifetime Value",
                value: "$45K",
                subtitle: "Average CLV",
                icon: "FiUser",
                trend: "up",
                trendValue: "+25% YoY",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Gross Margin",
                value: "85%",
                subtitle: "High margin SaaS model",
                icon: "FiTrendingUp",
                trend: "up",
                trendValue: "+5% YoY",
                variant: "warning",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Revenue Streams",
                features: [
                  {
                    text: "SaaS Subscriptions (70%)",
                    icon: "FiCreditCard",
                    highlight: true,
                  },
                  {
                    text: "Professional Services (20%)",
                    icon: "FiSettings",
                    highlight: false,
                  },
                  {
                    text: "Enterprise Licenses (10%)",
                    icon: "FiBuilding",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 1,
                rowStart: 6,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "doughnut",
                data: {
                  labels: [
                    "SaaS Subscriptions",
                    "Professional Services",
                    "Enterprise Licenses",
                  ],
                  datasets: [
                    {
                      data: [70, 20, 10],
                      backgroundColor: ["#3182ce", "#38a169", "#d69e2e"],
                    },
                  ],
                },
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 7,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-7",
          title: "Financial Projections",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Financial Projections",
                subtext: "Path to $50M ARR in 5 years",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "bar",
                data: {
                  labels: ["2023", "2024", "2025", "2026", "2027"],
                  datasets: [
                    {
                      label: "Revenue ($M)",
                      data: [2.5, 8, 18, 32, 50],
                      backgroundColor: "#3182ce",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 4,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "2027 Target",
                value: "$50M",
                subtitle: "Annual Recurring Revenue",
                icon: "FiTarget",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Growth Rate",
                value: "110%",
                subtitle: "Annual Growth",
                icon: "FiTrendingUp",
                trend: "up",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-8",
          title: "Team",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "World-Class Team",
                subtext: "Proven track record of building successful companies",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Leadership Team",
                features: [
                  {
                    text: "CEO: Former VP at Salesforce (10+ years)",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CTO: Ex-Google AI researcher, PhD Stanford",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CPO: Built 3 successful SaaS products",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CFO: Former CFO at $500M startup",
                    icon: "FiUser",
                    highlight: false,
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 3,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "This team has the perfect combination of technical expertise and business acumen to execute our vision.",
                author: "Dr. Michael Chen",
                title: "Board Member",
                company: "Sequoia Capital",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-9",
          title: "Funding Ask",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Investment Opportunity",
                subtext: "Join us in revolutionizing enterprise automation",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Funding Round",
                value: "Series A",
                subtitle: "Seeking $15M",
                icon: "FiDollarSign",
                variant: "primary",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Use of Funds",
                value: "Growth",
                subtitle: "Team, Sales, R&D",
                icon: "FiTarget",
                variant: "success",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Valuation",
                value: "$75M",
                subtitle: "Pre-money valuation",
                icon: "FiTrendingUp",
                variant: "warning",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Milestones",
                features: [
                  {
                    text: "Expand team to 50 employees",
                    icon: "FiUsers",
                    highlight: true,
                  },
                  {
                    text: "Launch enterprise product",
                    icon: "FiRocket",
                    highlight: true,
                  },
                  {
                    text: "Reach $10M ARR",
                    icon: "FiTarget",
                    highlight: true,
                  },
                  {
                    text: "International expansion",
                    icon: "FiGlobe",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 8,
                rows: 3,
                columnStart: 3,
                rowStart: 6,
                align: "start",
                justify: "center",
              },
            },
          ],
        },
      ],
    }),
  },
  {
    id: "techflow-solutions-pitch-deck",
    name: "TechFlow Solutions Pitch Deck",
    category: "fundraising",
    description:
      "Investor-ready pitch deck for TechFlow Solutions showcasing problem, solution, market, traction, and ask",
    slideCount: 8,
    duration: "15-20 minutes",
    difficulty: "Advanced",
    slides: [
      "Title & Tagline",
      "The Problem",
      "Our Solution",
      "Market Opportunity",
      "Competitive Landscape",
      "Business Model & GTM",
      "Team & Traction",
      "Vision & Ask",
    ],
    bestFor: [
      "Enterprise SaaS",
      "Series A",
      "B2B startups",
      "Investor presentations",
    ],
    features: [
      "AI-powered workflow automation narrative",
      "Data-driven market visuals",
      "Competitive 2x2 map",
      "Founders’ pedigree & traction",
      "Clear funding ask",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#3182ce",
        secondaryColor: "#2d3748",
        accentColor: "#38a169",
        backgroundColor: "#f7fafc",
        fontFamily: "Inter, system-ui, sans-serif",
        headingFontFamily: "Inter, system-ui, sans-serif",
      },
      slides: [
        {
          id: "slide-1",
          title: "Title & Tagline",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "TechFlow Solutions",
                subtext: "Revolutionizing Enterprise Workflow Automation",
                size: "2xl",
                variant: "hero",
                gradient: true,
                align: "center",
                color: "#1a365d",
                icon: "FiZap",
              },
              layout: {
                columns: 12,
                rows: 3,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LogoDisplay",
              props: {
                companyName: "TechFlow",
                variant: "standalone",
                size: "xl",
                circular: false,
                border: "accent",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Founded",
                value: "2023",
                subtitle: "Year Established",
                icon: "FiCalendar",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 3,
                rows: 1,
                columnStart: 2,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Team Size",
                value: "15",
                subtitle: "Full-time Employees",
                icon: "FiUsers",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 3,
                rows: 1,
                columnStart: 6,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Location",
                value: "San Francisco",
                subtitle: "Headquarters",
                icon: "FiMapPin",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 3,
                rows: 1,
                columnStart: 10,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-2",
          title: "The Problem",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "The Problem We're Solving",
                subtext:
                  "Enterprise workflow inefficiencies cost billions annually",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 2,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiAlertTriangle",
                title: "Manual Processes",
                description:
                  "80% of enterprises still rely on manual, error-prone workflows",
                color: "#e53e3e",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 1,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiClock",
                title: "Time Waste",
                description:
                  "Employees spend 40% of their time on repetitive tasks",
                color: "#d69e2e",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 5,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiDollarSign",
                title: "High Costs",
                description:
                  "$2.7 trillion lost annually due to inefficient processes",
                color: "#38a169",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 9,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "bar",
                data: {
                  labels: [
                    "Manual Processes",
                    "Time Waste",
                    "Error Rate",
                    "Cost Impact",
                  ],
                  datasets: [
                    {
                      label: "Impact Score (1-10)",
                      data: [8, 7, 9, 8],
                      backgroundColor: "#e53e3e",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 6,
                columnStart: 3,
                rowStart: 8,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-3",
          title: "Our Solution",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "AI-Powered Workflow Automation",
                subtext: "Intelligent automation that learns and adapts",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Features",
                features: [
                  {
                    text: "AI-powered process learning",
                    icon: "FiBrain",
                    highlight: true,
                  },
                  {
                    text: "Real-time workflow optimization",
                    icon: "FiZap",
                    highlight: true,
                  },
                  {
                    text: "Seamless integration with existing systems",
                    icon: "FiLink",
                    highlight: false,
                  },
                  {
                    text: "Advanced analytics and reporting",
                    icon: "FiBarChart2",
                    highlight: false,
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 3,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "TechFlow reduced our processing time by 75% and eliminated 90% of manual errors.",
                author: "Sarah Chen",
                title: "CTO",
                company: "GlobalTech Inc.",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-4",
          title: "Market Opportunity",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Massive Market Opportunity",
                subtext: "The workflow automation market is exploding",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Total Addressable Market",
                value: "$45B",
                subtitle: "Global workflow automation market",
                icon: "FiGlobe",
                trend: "up",
                trendValue: "+23% YoY",
                variant: "primary",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Serviceable Market",
                value: "$12B",
                subtitle: "Enterprise segment we target",
                icon: "FiTarget",
                trend: "up",
                trendValue: "+18% YoY",
                variant: "success",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Target Market",
                value: "$2.8B",
                subtitle: "Immediate opportunity",
                icon: "FiTrendingUp",
                trend: "up",
                trendValue: "+35% YoY",
                variant: "warning",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "line",
                data: {
                  labels: ["2023", "2024", "2025", "2026", "2027"],
                  datasets: [
                    {
                      label: "Market Growth ($B)",
                      data: [45, 55, 68, 84, 103],
                      backgroundColor: "#3182ce",
                      borderColor: "#3182ce",
                    },
                  ],
                },
              },
              layout: {
                columns: 10,
                rows: 5,
                columnStart: 2,
                rowStart: 7,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-5",
          title: "Competitive Landscape",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Why We'll Win",
                subtext: "Competitive advantages that set us apart",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Feature", "Competitors", "TechFlow"],
                rows: [
                  ["AI Learning", "Basic", "Advanced ML"],
                  ["Integration", "Limited", "Universal"],
                  ["Analytics", "Standard", "Predictive"],
                  ["Pricing", "High", "Competitive"],
                  ["Support", "Email Only", "24/7 Live"],
                ],
              },
              layout: {
                columns: 10,
                rows: 6,
                columnStart: 2,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-6",
          title: "Business Model & GTM",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Scalable Revenue Model",
                subtext: "Multiple revenue streams with strong unit economics",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 7,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Annual Recurring Revenue",
                value: "$2.5M",
                subtitle: "Current ARR",
                icon: "FiDollarSign",
                trend: "up",
                trendValue: "+300% YoY",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Customer Lifetime Value",
                value: "$45K",
                subtitle: "Average CLV",
                icon: "FiUser",
                trend: "up",
                trendValue: "+25% YoY",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Gross Margin",
                value: "85%",
                subtitle: "High margin SaaS model",
                icon: "FiTrendingUp",
                trend: "up",
                trendValue: "+5% YoY",
                variant: "warning",
                size: "md",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Revenue Streams",
                features: [
                  {
                    text: "SaaS Subscriptions (70%)",
                    icon: "FiCreditCard",
                    highlight: true,
                  },
                  {
                    text: "Professional Services (20%)",
                    icon: "FiSettings",
                    highlight: false,
                  },
                  {
                    text: "Enterprise Licenses (10%)",
                    icon: "FiBuilding",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 1,
                rowStart: 6,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "doughnut",
                data: {
                  labels: [
                    "SaaS Subscriptions",
                    "Professional Services",
                    "Enterprise Licenses",
                  ],
                  datasets: [
                    {
                      data: [70, 20, 10],
                      backgroundColor: ["#3182ce", "#38a169", "#d69e2e"],
                    },
                  ],
                },
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 7,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-7",
          title: "Team & Traction",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "World-Class Team",
                subtext: "Proven track record of building successful companies",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Leadership Team",
                features: [
                  {
                    text: "CEO: Former VP at Salesforce (10+ years)",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CTO: Ex-Google AI researcher, PhD Stanford",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CPO: Built 3 successful SaaS products",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CFO: Former CFO at $500M startup",
                    icon: "FiUser",
                    highlight: false,
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 3,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "This team has the perfect combination of technical expertise and business acumen to execute our vision.",
                author: "Dr. Michael Chen",
                title: "Board Member",
                company: "Sequoia Capital",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-8",
          title: "Vision & Ask",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Investment Opportunity",
                subtext: "Join us in revolutionizing enterprise automation",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Funding Round",
                value: "Series A",
                subtitle: "Seeking $15M",
                icon: "FiDollarSign",
                variant: "primary",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Use of Funds",
                value: "Growth",
                subtitle: "Team, Sales, R&D",
                icon: "FiTarget",
                variant: "success",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Valuation",
                value: "$75M",
                subtitle: "Pre-money valuation",
                icon: "FiTrendingUp",
                variant: "warning",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Milestones",
                features: [
                  {
                    text: "Expand team to 50 employees",
                    icon: "FiUsers",
                    highlight: true,
                  },
                  {
                    text: "Launch enterprise product",
                    icon: "FiRocket",
                    highlight: true,
                  },
                  {
                    text: "Reach $10M ARR",
                    icon: "FiTarget",
                    highlight: true,
                  },
                  {
                    text: "International expansion",
                    icon: "FiGlobe",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 8,
                rows: 3,
                columnStart: 3,
                rowStart: 6,
                align: "start",
                justify: "center",
              },
            },
          ],
        },
      ],
    }),
  },
];

export const getTemplateById = (id: string): PitchDeckTemplate | undefined => {
  return pitchDeckTemplates.find((template) => template.id === id);
};

export const getAllTemplates = (): PitchDeckTemplate[] => {
  return pitchDeckTemplates;
};

export const getTemplatesByCategory = (
  category: string
): PitchDeckTemplate[] => {
  return pitchDeckTemplates.filter(
    (template) => template.category === category
  );
};
