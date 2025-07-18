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
      "A classic, data-driven pitch deck for serious fundraising. Perfect for VCs, angels, and institutional investors. Heavy on charts, tables, and business fundamentals.",
    slideCount: 9,
    duration: "15-20 minutes",
    difficulty: "Advanced",
    slides: [
      "Cover & Company Overview",
      "The Problem",
      "Market Size & Opportunity",
      "Our Solution",
      "Business Model",
      "Go-To-Market & Traction",
      "Financials & Projections",
      "Team",
      "The Ask",
    ],
    bestFor: [
      "VC fundraising",
      "Growth-stage startups",
      "B2B SaaS",
      "Data-driven founders",
      "Investor meetings",
    ],
    features: [
      "Professional blue/green theme",
      "Multiple charts & tables",
      "Detailed financials",
      "Classic investor narrative",
      "Comprehensive business overview",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#2563eb", // blue-600
        secondaryColor: "#059669", // emerald-600
        accentColor: "#f59e42", // orange-400
        backgroundColor: "#f9fafb", // gray-50
        fontFamily: "Inter, system-ui, sans-serif",
        headingFontFamily: "Inter, system-ui, sans-serif",
      },
      slides: [
        {
          id: "slide-1",
          title: "Cover & Company Overview",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "BluePeak Analytics",
                subtext: "Data-Driven Insights for Modern Enterprises",
                size: "2xl",
                variant: "hero",
                gradient: true,
                align: "center",
                color: "#2563eb",
                icon: "FiBarChart2",
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
                companyName: "BluePeak",
                variant: "standalone",
                size: "xl",
                circular: true,
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
                value: "2020",
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
                title: "HQ",
                value: "New York",
                subtitle: "Headquarters",
                icon: "FiMapPin",
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
                title: "Employees",
                value: "42",
                subtitle: "Team Size",
                icon: "FiUsers",
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
      "A bold, modern pitch deck for demo days and startup competitions. Focused on vision, product, and team, with vibrant visuals and storytelling flow.",
    slideCount: 8,
    duration: "10-12 minutes",
    difficulty: "Intermediate",
    slides: [
      "Brand Splash & Tagline",
      "Vision & Mission",
      "The Problem",
      "Our Product",
      "Customer Stories",
      "Go-To-Market",
      "Meet the Team",
      "The Ask",
    ],
    bestFor: [
      "Demo days",
      "Startup competitions",
      "Product launches",
      "Visionary founders",
      "Tech events",
    ],
    features: [
      "Vibrant dark/teal/purple theme",
      "Storytelling layout",
      "Illustrations & testimonials",
      "Team & vision focus",
      "Modern product showcase",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#7c3aed", // purple-600
        secondaryColor: "#14b8a6", // teal-500
        accentColor: "#f472b6", // pink-400
        backgroundColor: "#18181b", // zinc-900
        fontFamily: "Poppins, Inter, system-ui, sans-serif",
        headingFontFamily: "Poppins, Inter, system-ui, sans-serif",
      },
      slides: [
        {
          id: "slide-1",
          title: "Brand Splash & Tagline",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "TechFlow",
                subtext: "Unleashing the Power of Automation",
                size: "2xl",
                variant: "hero",
                gradient: true,
                align: "center",
                color: "#7c3aed",
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
                circular: true,
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
          ],
        },
        {
          id: "slide-2",
          title: "Vision & Mission",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Vision",
                subtext:
                  "To empower every business with intelligent automation",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#7c3aed",
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
                iconName: "FiLightbulb",
                title: "The Problem",
                description:
                  "Manual workflows are inefficient, time-consuming, and prone to errors. We're here to change that.",
                color: "#f472b6",
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
                iconName: "FiTarget",
                title: "Our Mission",
                description:
                  "To build the most advanced AI platform for workflow automation, enabling businesses to achieve unprecedented efficiency and innovation.",
                color: "#14b8a6",
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
          ],
        },
        {
          id: "slide-3",
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
          id: "slide-4",
          title: "Our Product",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Revolutionary Product",
                subtext: "AI-Powered Workflow Automation",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#7c3aed",
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
          id: "slide-5",
          title: "Customer Stories",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "What Our Customers Say",
                subtext:
                  "Hear from businesses that have transformed their workflows",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#7c3aed",
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
              name: "QuoteCard",
              props: {
                quote:
                  "TechFlow has been a game-changer for our team. Their AI platform not only increased efficiency but also reduced our costs significantly.",
                author: "Maria Rodriguez",
                title: "CFO",
                company: "FinCorp Inc.",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "The ease of integration and the reliability of their product have made us more competitive in the market.",
                author: "David Lee",
                title: "CTO",
                company: "TechStart Ltd.",
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
          id: "slide-6",
          title: "Go-To-Market",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Go-To-Market Strategy",
                subtext: "Building a scalable and sustainable business",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#7c3aed",
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
              name: "FeatureList",
              props: {
                title: "Channels",
                features: [
                  {
                    text: "Direct Sales (40%)",
                    icon: "FiUsers",
                    highlight: true,
                  },
                  {
                    text: "Channel Partners (30%)",
                    icon: "FiUsers",
                    highlight: true,
                  },
                  {
                    text: "Referral Program (30%)",
                    icon: "FiUsers",
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
                    "Direct Sales",
                    "Channel Partners",
                    "Referral Program",
                  ],
                  datasets: [
                    {
                      data: [40, 30, 30],
                      backgroundColor: ["#7c3aed", "#14b8a6", "#f472b6"],
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
          title: "Meet the Team",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "The Team Behind TechFlow",
                subtext: "Proven track record of building successful companies",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#7c3aed",
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
          title: "The Ask",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Investment Opportunity",
                subtext: "Join us in revolutionizing enterprise automation",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#7c3aed",
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
