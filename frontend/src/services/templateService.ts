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
  // Enhanced Pitch Deck Templates with Improved Grid Layouts

  {
    id: "modern-saas-pitch-deck",
    name: "Modern SaaS Pitch Deck",
    category: "fundraising",
    description:
      "A sleek, modern pitch deck designed for SaaS companies seeking Series A funding. Features clean typography, strategic data visualization, and investor-focused messaging with a professional orange/blue theme.",
    slideCount: 10,
    duration: "18-22 minutes",
    difficulty: "Advanced",
    slides: [
      "Company Introduction",
      "Problem Statement",
      "Solution Overview",
      "Market Opportunity",
      "Product Demo",
      "Business Model",
      "Traction & Growth",
      "Financial Projections",
      "Team & Leadership",
      "Funding Ask",
    ],
    bestFor: [
      "SaaS startups",
      "Series A fundraising",
      "B2B software",
      "Growth-stage companies",
      "Data-driven pitches",
    ],
    features: [
      "Clean orange/blue color scheme",
      "Data-heavy visualizations",
      "Professional layouts",
      "Investor-focused metrics",
      "Modern typography",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#f97316", // orange-500
        secondaryColor: "#3b82f6", // blue-500
        accentColor: "#8b5cf6", // violet-500
        backgroundColor: "#ffffff", // white
        fontFamily: "Inter, system-ui, sans-serif",
        headingFontFamily: "Inter, system-ui, sans-serif",
      },
      slides: [
        {
          id: "slide-1",
          title: "Company Introduction",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "CloudSync Pro",
                subtext: "Enterprise Data Integration Platform",
                size: "2xl",
                variant: "hero",
                gradient: true,
                align: "center",
                color: "#f97316",
                icon: "FiCloud",
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
                companyName: "CloudSync",
                variant: "standalone",
                size: "lg",
                circular: true,
                border: "accent",
              },
              layout: {
                columns: 3,
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
                value: "2021",
                subtitle: "Seed Stage",
                icon: "FiCalendar",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 2,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Revenue",
                value: "$1.2M",
                subtitle: "ARR",
                icon: "FiDollarSign",
                variant: "success",
                size: "sm",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 5,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Customers",
                value: "85",
                subtitle: "Enterprise",
                icon: "FiBuilding",
                variant: "warning",
                size: "sm",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 8,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "Seeking $5M Series A to scale our enterprise data integration platform",
                author: "Sarah Mitchell",
                title: "CEO & Co-Founder",
                company: "CloudSync Pro",
                variant: "testimonial",
                size: "sm",
              },
              layout: {
                columns: 8,
                rows: 2,
                columnStart: 3,
                rowStart: 8,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-2",
          title: "Problem Statement",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "The Data Integration Crisis",
                subtext:
                  "Enterprise data silos are costing businesses billions",
                size: "xl",
                variant: "section",
                align: "left",
                color: "#1f2937",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 1,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiDatabase",
                title: "Data Silos",
                description:
                  "Average enterprise uses 175+ different software tools with disconnected data",
                color: "#dc2626",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 1,
                rowStart: 3,
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
                  "IT teams spend 70% of time on manual data integration tasks",
                color: "#ea580c",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 5,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiAlertCircle",
                title: "Poor Decisions",
                description:
                  "87% of executives lack real-time access to critical business data",
                color: "#b91c1c",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Annual Cost",
                value: "$15M",
                subtitle: "Average enterprise data integration cost",
                icon: "FiTrendingDown",
                variant: "danger",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Market Size",
                value: "$19.6B",
                subtitle: "Data integration market by 2027",
                icon: "FiGlobe",
                variant: "primary",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Growth Rate",
                value: "12.3%",
                subtitle: "CAGR 2022-2027",
                icon: "FiTrendingUp",
                variant: "success",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-3",
          title: "Solution Overview",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "CloudSync Pro Platform",
                subtext: "AI-powered, no-code data integration for enterprises",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#f97316",
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
                title: "Core Features",
                features: [
                  {
                    text: "No-code visual integration builder",
                    icon: "FiEdit3",
                    highlight: true,
                  },
                  {
                    text: "AI-powered data mapping and transformation",
                    icon: "FiBrain",
                    highlight: true,
                  },
                  {
                    text: "Real-time sync with 500+ enterprise apps",
                    icon: "FiRefreshCw",
                    highlight: true,
                  },
                  {
                    text: "Enterprise-grade security and compliance",
                    icon: "FiShield",
                    highlight: false,
                  },
                  {
                    text: "Advanced monitoring and alerting",
                    icon: "FiActivity",
                    highlight: false,
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 5,
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
                  "CloudSync reduced our data integration time from weeks to hours. It's like having a team of data engineers at our fingertips.",
                author: "Mark Rodriguez",
                title: "CTO",
                company: "TechCorp Industries",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Time Saved",
                value: "90%",
                subtitle: "Faster integration setup",
                icon: "FiZap",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 7,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Cost Reduction",
                value: "65%",
                subtitle: "Lower integration costs",
                icon: "FiDollarSign",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 10,
                rowStart: 6,
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
                subtext: "Riding the wave of digital transformation",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#1f2937",
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
                title: "TAM",
                value: "$19.6B",
                subtitle: "Total Addressable Market",
                icon: "FiGlobe",
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
                title: "SAM",
                value: "$4.2B",
                subtitle: "Serviceable Available Market",
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
                title: "SOM",
                value: "$850M",
                subtitle: "Serviceable Obtainable Market",
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
              name: "DeckChart",
              props: {
                type: "line",
                data: {
                  labels: ["2023", "2024", "2025", "2026", "2027"],
                  datasets: [
                    {
                      label: "Market Size ($B)",
                      data: [15.2, 16.8, 17.9, 18.7, 19.6],
                      backgroundColor: "#f97316",
                      borderColor: "#f97316",
                    },
                    {
                      label: "Our Opportunity ($M)",
                      data: [1.2, 5.8, 18.5, 42.1, 85.0],
                      backgroundColor: "#3b82f6",
                      borderColor: "#3b82f6",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 4,
                columnStart: 1,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Market Drivers",
                features: [
                  {
                    text: "Digital transformation acceleration",
                    icon: "FiTrendingUp",
                    highlight: true,
                  },
                  {
                    text: "Remote work data challenges",
                    icon: "FiHome",
                    highlight: true,
                  },
                  {
                    text: "AI/ML adoption requiring clean data",
                    icon: "FiBrain",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 4,
                rows: 4,
                columnStart: 9,
                rowStart: 5,
                align: "start",
                justify: "start",
              },
            },
          ],
        },
        {
          id: "slide-5",
          title: "Product Demo",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "See CloudSync in Action",
                subtext: "From data chaos to unified insights in minutes",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#f97316",
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
              name: "IllustrationFlow",
              props: {
                iconName: "FiPlay",
                title: "Live Demo",
                description:
                  "Watch how we integrate Salesforce, HubSpot, and Slack in under 5 minutes",
                color: "#f97316",
              },
              layout: {
                columns: 8,
                rows: 4,
                columnStart: 3,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Demo Highlights",
                features: [
                  {
                    text: "Drag-and-drop integration setup",
                    icon: "FiMousePointer",
                    highlight: true,
                  },
                  {
                    text: "AI-suggested field mappings",
                    icon: "FiZap",
                    highlight: true,
                  },
                  {
                    text: "Real-time data preview",
                    icon: "FiEye",
                    highlight: true,
                  },
                  {
                    text: "Instant deployment to production",
                    icon: "FiRocket",
                    highlight: false,
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 4,
                rowStart: 7,
                align: "start",
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
                text: "Scalable SaaS Business Model",
                subtext: "Recurring revenue with strong unit economics",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#1f2937",
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
                title: "Starter",
                value: "$299",
                subtitle: "per month",
                icon: "FiDollarSign",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 3,
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
                title: "Professional",
                value: "$999",
                subtitle: "per month",
                icon: "FiDollarSign",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 4,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Enterprise",
                value: "$4,999",
                subtitle: "per month",
                icon: "FiDollarSign",
                variant: "warning",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Custom",
                value: "$15K+",
                subtitle: "per month",
                icon: "FiDollarSign",
                variant: "danger",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 10,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "doughnut",
                data: {
                  labels: ["Starter", "Professional", "Enterprise", "Custom"],
                  datasets: [
                    {
                      label: "Revenue Distribution",
                      data: [15, 35, 40, 10],
                      backgroundColor: [
                        "#10b981",
                        "#f97316",
                        "#eab308",
                        "#dc2626",
                      ],
                    },
                  ],
                },
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Metrics",
                features: [
                  {
                    text: "Average Contract Value: $18K",
                    icon: "FiDollarSign",
                    highlight: true,
                  },
                  {
                    text: "Customer Lifetime Value: $85K",
                    icon: "FiTrendingUp",
                    highlight: true,
                  },
                  {
                    text: "Churn Rate: 3% monthly",
                    icon: "FiUsers",
                    highlight: false,
                  },
                  {
                    text: "Gross Margin: 88%",
                    icon: "FiPieChart",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 5,
                align: "start",
                justify: "start",
              },
            },
          ],
        },
        {
          id: "slide-7",
          title: "Traction & Growth",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Strong Traction & Product-Market Fit",
                subtext: "Consistent growth across all key metrics",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#1f2937",
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
                title: "ARR",
                value: "$1.2M",
                subtitle: "Annual Recurring Revenue",
                icon: "FiDollarSign",
                trend: "up",
                trendValue: "+285% YoY",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 3,
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
                title: "Customers",
                value: "85",
                subtitle: "Enterprise Customers",
                icon: "FiBuilding",
                trend: "up",
                trendValue: "+180% YoY",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 4,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "NPS Score",
                value: "72",
                subtitle: "Net Promoter Score",
                icon: "FiHeart",
                trend: "up",
                trendValue: "+15 pts",
                variant: "warning",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 7,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Pipeline",
                value: "$3.2M",
                subtitle: "Sales Pipeline",
                icon: "FiTrendingUp",
                trend: "up",
                trendValue: "+95% QoQ",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 10,
                rowStart: 3,
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
                    "Q1 2023",
                    "Q2 2023",
                    "Q3 2023",
                    "Q4 2023",
                    "Q1 2024",
                  ],
                  datasets: [
                    {
                      label: "ARR ($K)",
                      data: [120, 185, 285, 420, 650],
                      backgroundColor: "#f97316",
                    },
                    {
                      label: "Customers",
                      data: [18, 28, 38, 52, 71],
                      backgroundColor: "#3b82f6",
                    },
                  ],
                },
              },
              layout: {
                columns: 10,
                rows: 4,
                columnStart: 2,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-8",
          title: "Financial Projections",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Financial Projections",
                subtext: "Path to $25M ARR by 2027",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#1f2937",
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
                type: "line",
                data: {
                  labels: ["2023", "2024", "2025", "2026", "2027"],
                  datasets: [
                    {
                      label: "Revenue ($M)",
                      data: [1.2, 3.8, 9.2, 16.8, 25.4],
                      backgroundColor: "#f97316",
                      borderColor: "#f97316",
                    },
                    {
                      label: "Gross Profit ($M)",
                      data: [1.0, 3.3, 8.1, 14.8, 22.4],
                      backgroundColor: "#10b981",
                      borderColor: "#10b981",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 5,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Assumptions",
                features: [
                  {
                    text: "15% monthly growth rate",
                    icon: "FiTrendingUp",
                    highlight: true,
                  },
                  {
                    text: "88% gross margin maintained",
                    icon: "FiPercent",
                    highlight: true,
                  },
                  {
                    text: "3% monthly churn rate",
                    icon: "FiUsers",
                    highlight: false,
                  },
                  {
                    text: "25% net revenue retention",
                    icon: "FiRepeat",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 9,
                rowStart: 3,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "2027 Target",
                value: "$25M",
                subtitle: "Annual Recurring Revenue",
                icon: "FiTarget",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 9,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Customers",
                value: "450",
                subtitle: "Enterprise Accounts",
                icon: "FiBuilding",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 11,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-9",
          title: "Team & Leadership",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Proven Leadership Team",
                subtext:
                  "Deep expertise in enterprise software and data integration",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#1f2937",
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
                title: "Executive Team",
                features: [
                  {
                    text: "CEO: Sarah Mitchell - Former VP Product at Snowflake",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CTO: David Chen - Ex-Principal Engineer at Databricks",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "VP Sales: Maria Santos - Former RVP at Salesforce",
                    icon: "FiUser",
                    highlight: false,
                  },
                ],
                variant: "highlights",
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
              name: "FeatureList",
              props: {
                title: "Security & Compliance",
                features: [
                  {
                    text: "HIPAA compliant infrastructure",
                    icon: "FiShield",
                    highlight: true,
                  },
                  {
                    text: "SOC 2 Type II certified",
                    icon: "FiLock",
                    highlight: true,
                  },
                  {
                    text: "End-to-end encryption",
                    icon: "FiKey",
                    highlight: false,
                  },
                  {
                    text: "Audit trail & data governance",
                    icon: "FiFileText",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 5,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Uptime",
                value: "99.9%",
                subtitle: "Platform availability",
                icon: "FiServer",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 7,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Processing",
                value: "10M+",
                subtitle: "Images analyzed",
                icon: "FiImage",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 10,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-7",
          title: "Regulatory & Compliance",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "FDA Pathway & Regulatory Strategy",
                subtext: "Clear path to market with regulatory approvals",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#0ea5e9",
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
              name: "IllustrationFlow",
              props: {
                iconName: "FiCheckCircle",
                title: "FDA Breakthrough",
                description:
                  "Designated as breakthrough device - expedited review process",
                color: "#10b981",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiFileText",
                title: "510(k) Clearance",
                description:
                  "Pre-submission meetings completed, full submission Q2 2025",
                color: "#0ea5e9",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 5,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiGlobe",
                title: "CE Marking",
                description:
                  "European market entry strategy - MDR compliance pathway",
                color: "#6366f1",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 9,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Regulatory Milestones",
                features: [
                  {
                    text: "Q1 2025: Complete pivotal trial",
                    icon: "FiCalendar",
                    highlight: true,
                  },
                  {
                    text: "Q2 2025: Submit 510(k) to FDA",
                    icon: "FiSend",
                    highlight: true,
                  },
                  {
                    text: "Q4 2025: Expected FDA clearance",
                    icon: "FiAward",
                    highlight: true,
                  },
                  {
                    text: "Q1 2026: Begin commercial sales",
                    icon: "FiDollarSign",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 6,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "The FDA has been extremely supportive of our breakthrough designation. They see the clinical need and our solution addresses it directly.",
                author: "Dr. Sarah Kim",
                title: "VP Regulatory Affairs",
                company: "MedTech Solutions",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-8",
          title: "Financial Model",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "SaaS Model with High-Value Outcomes",
                subtext:
                  "Subscription-based revenue with proven ROI for healthcare systems",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#1f2937",
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
                type: "line",
                data: {
                  labels: ["2025", "2026", "2027", "2028", "2029"],
                  datasets: [
                    {
                      label: "Revenue ($M)",
                      data: [0.8, 4.2, 12.6, 28.4, 52.1],
                      backgroundColor: "#0ea5e9",
                      borderColor: "#0ea5e9",
                    },
                    {
                      label: "Gross Profit ($M)",
                      data: [0.6, 3.4, 10.8, 24.8, 46.9],
                      backgroundColor: "#10b981",
                      borderColor: "#10b981",
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
                title: "ARR by 2029",
                value: "$52M",
                subtitle: "Annual recurring revenue",
                icon: "FiRepeat",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 2,
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
                title: "Gross Margin",
                value: "90%",
                subtitle: "SaaS economics",
                icon: "FiPercent",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 11,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "LTV/CAC",
                value: "8.2x",
                subtitle: "Unit economics",
                icon: "FiTrendingUp",
                variant: "warning",
                size: "md",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 9,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "CAC Payback",
                value: "18 mo",
                subtitle: "Customer acquisition",
                icon: "FiCalendar",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 2,
                rows: 2,
                columnStart: 11,
                rowStart: 5,
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
                    text: "Platform License: $50K-200K annually",
                    icon: "FiDollarSign",
                    highlight: true,
                  },
                  {
                    text: "Per-scan fees: $15-25 per analysis",
                    icon: "FiActivity",
                    highlight: true,
                  },
                  {
                    text: "Professional services: Implementation",
                    icon: "FiSettings",
                    highlight: false,
                  },
                  {
                    text: "Support & training: 20% of license",
                    icon: "FiHelpCircle",
                    highlight: false,
                  },
                ],
                variant: "highlights",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 1,
                rowStart: 7,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "ROI is clear - we save $2.3M annually in reduced readmissions and faster discharge times. The platform pays for itself in 6 months.",
                author: "CFO",
                title: "Regional Health System",
                company: "450-bed hospital",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 6,
                rows: 3,
                columnStart: 7,
                rowStart: 7,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-9",
          title: "Leadership Team",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Proven Healthcare & AI Leadership",
                subtext:
                  "Deep domain expertise with successful exits and clinical experience",
                size: "xl",
                variant: "section",
                align: "center",
                color: "#0ea5e9",
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
                title: "Executive Team",
                features: [
                  {
                    text: "CEO: Dr. Emily Rodriguez - Former CMO at Teladoc",
                    icon: "FiUser",
                    highlight: true,
                  },
                  {
                    text: "CTO: James Park - Ex-VP Engineering at PathAI",
                    icon: "FiCode",
                    highlight: true,
                  },
                  {
                    text: "VP Clinical: Dr. Michael Thompson - Mayo Clinic",
                    icon: "FiActivity",
                    highlight: true,
                  },
                  {
                    text: "VP Sales: Lisa Chen - Former RD at Philips Healthcare",
                    icon: "FiTrendingUp",
                    highlight: false,
                  },
                ],
                variant: "highlights",
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
              name: "FeatureList",
              props: {
                title: "Advisory Board",
                features: [
                  {
                    text: "Dr. Robert Smith - Former FDA Commissioner",
                    icon: "FiStar",
                    highlight: true,
                  },
                  {
                    text: "Sarah Williams - Ex-CEO Merge Healthcare ($1B exit)",
                    icon: "FiAward",
                    highlight: true,
                  },
                  {
                    text: "Dr. Kevin Liu - Chief of Radiology, Stanford",
                    icon: "FiTarget",
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
                columnStart: 7,
                rowStart: 3,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Team Size",
                value: "32",
                subtitle: "Full-time employees",
                icon: "FiUsers",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 7,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Experience",
                value: "120+",
                subtitle: "Years combined",
                icon: "FiClock",
                variant: "success",
                size: "md",
              },
              layout: {
                columns: 3,
                rows: 2,
                columnStart: 10,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "QuoteCard",
              props: {
                quote:
                  "This team has the perfect combination of clinical depth, regulatory experience, and technical excellence to transform diagnostic medicine.",
                author: "Dr. Maria Gonzalez",
                title: "Partner",
                company: "Andreessen Horowitz",
                variant: "testimonial",
                size: "md",
              },
              layout: {
                columns: 8,
                rows: 2,
                columnStart: 3,
                rowStart: 8,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "slide-10",
          title: "Investment Opportunity",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "$15M Series A Funding",
                subtext: "Accelerating FDA approval and commercial launch",
                size: "2xl",
                variant: "hero",
                gradient: true,
                align: "center",
                color: "#0ea5e9",
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
              name: "FeatureList",
              props: {
                title: "Use of Funds",
                features: [
                  {
                    text: "Clinical trials & FDA submission - $6M (40%)",
                    icon: "FiActivity",
                    highlight: true,
                  },
                  {
                    text: "Product development & platform - $3.75M (25%)",
                    icon: "FiCode",
                    highlight: true,
                  },
                  {
                    text: "Sales & marketing build-out - $3M (20%)",
                    icon: "FiTrendingUp",
                    highlight: true,
                  },
                  {
                    text: "Team expansion & operations - $2.25M (15%)",
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
                rows: 4,
                columnStart: 1,
                rowStart: 4,
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
                    "Clinical & FDA",
                    "Product Dev",
                    "Sales & Marketing",
                    "Team & Ops",
                  ],
                  datasets: [
                    {
                      label: "Fund Allocation",
                      data: [40, 25, 20, 15],
                      backgroundColor: [
                        "#0ea5e9",
                        "#10b981",
                        "#f59e0b",
                        "#8b5cf6",
                      ],
                    },
                  ],
                },
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 7,
                rowStart: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Projected Valuation",
                value: "$200M",
                subtitle: "Post-FDA approval",
                icon: "FiTrendingUp",
                variant: "success",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 1,
                rowStart: 8,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Time to Exit",
                value: "5-7 yrs",
                subtitle: "Strategic acquisition",
                icon: "FiClock",
                variant: "primary",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 8,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Expected ROI",
                value: "15-25x",
                subtitle: "Investor returns",
                icon: "FiDollarSign",
                variant: "warning",
                size: "lg",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 9,
                rowStart: 8,
                align: "center",
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
