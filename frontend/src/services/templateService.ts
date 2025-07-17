import type { DeckSpec, Slide, SlideItem } from "@/components/Deck/slideTypes";

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
    id: "startup-fundraising",
    name: "Startup Fundraising",
    category: "fundraising",
    description:
      "Comprehensive pitch deck for early-stage startups seeking seed or Series A funding",
    slideCount: 12,
    duration: "15-20 minutes",
    difficulty: "Intermediate",
    slides: [
      "Title & Company Overview",
      "Problem Statement",
      "Solution & Product",
      "Market Opportunity",
      "Business Model",
      "Go-to-Market Strategy",
      "Competitive Analysis",
      "Financial Projections",
      "Team & Advisors",
      "Traction & Milestones",
      "Funding Ask",
      "Next Steps",
    ],
    bestFor: ["Seed stage", "Series A", "Tech startups", "B2B SaaS"],
    features: [
      "Investor-focused",
      "Financial modeling",
      "Traction metrics",
      "Team highlights",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#14248a",
        secondaryColor: "#998fc7",
        accentColor: "#d4c2fc",
        backgroundColor: "#f9f5ff",
        fontFamily: "Inter",
        headingFontFamily: "Merriweather",
      },
      slides: [
        {
          id: "title",
          title: "Title & Company Overview",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "TechFlow Solutions",
                subtext: "Revolutionizing Enterprise Workflow Management",
                size: "xl",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 2,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "Founded 2023 | San Francisco, CA",
                size: "md",
                align: "center",
                underline: false,
                color: "#5a5860",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "Mission: Empower teams to work smarter, not harder",
                size: "sm",
                align: "center",
                underline: false,
                color: "#998fc7",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "problem",
          title: "Problem Statement",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "The Problem",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Current State", "Pain Points", "Impact"],
                rows: [
                  [
                    "Manual workflows",
                    "Time-consuming processes",
                    "$50K+ annual waste",
                  ],
                  [
                    "Disconnected tools",
                    "Data silos & inefficiency",
                    "40% productivity loss",
                  ],
                  ["No automation", "Repetitive tasks", "Employee burnout"],
                  [
                    "Poor visibility",
                    "No real-time insights",
                    "Delayed decisions",
                  ],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "solution",
          title: "Solution & Product",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Solution",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiZap",
                title: "AI-Powered Workflow Automation",
                description:
                  "Intelligent process optimization that learns and adapts to your team's needs",
              },
              layout: {
                columns: 6,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiDatabase",
                title: "Unified Data Platform",
                description:
                  "Centralized data management with real-time analytics and insights",
              },
              layout: {
                columns: 6,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 7,
              },
            },
          ],
        },
        {
          id: "market",
          title: "Market Opportunity",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Market Opportunity",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "doughnut",
                data: {
                  labels: ["TAM", "SAM", "Target Market"],
                  datasets: [
                    {
                      data: [50, 10, 2],
                      backgroundColor: ["#14248a", "#998fc7", "#d4c2fc"],
                    },
                  ],
                },
              },
              layout: {
                columns: 6,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "$50B Total Addressable Market\n$10B Serviceable Market\n$2B Target Market",
                size: "md",
                align: "left",
                underline: false,
                color: "#5a5860",
              },
              layout: {
                columns: 6,
                rows: 4,
                align: "center",
                justify: "center",
                columnStart: 7,
              },
            },
          ],
        },
        {
          id: "business-model",
          title: "Business Model",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Business Model",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Revenue Stream", "Pricing Model", "Target Customer"],
                rows: [
                  [
                    "SaaS Subscriptions",
                    "$99-999/month",
                    "Mid-market enterprises",
                  ],
                  [
                    "Implementation Services",
                    "$50K-200K",
                    "Enterprise clients",
                  ],
                  ["Custom Integrations", "$25K-100K", "Large enterprises"],
                  ["Training & Support", "$5K-25K", "All customers"],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "go-to-market",
          title: "Go-to-Market Strategy",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Go-to-Market Strategy",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiUsers",
                title: "Direct Sales",
                description:
                  "Enterprise sales team targeting Fortune 500 companies",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiGlobe",
                title: "Digital Marketing",
                description:
                  "Content marketing and SEO to generate inbound leads",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 5,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiHandshake",
                title: "Partnerships",
                description: "Strategic partnerships with consulting firms",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 9,
              },
            },
          ],
        },
        {
          id: "competitive",
          title: "Competitive Analysis",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Competitive Landscape",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: [
                  "Competitor",
                  "Strengths",
                  "Weaknesses",
                  "Our Advantage",
                ],
                rows: [
                  [
                    "ServiceNow",
                    "Enterprise presence",
                    "Complex & expensive",
                    "Ease of use",
                  ],
                  [
                    "Asana",
                    "User-friendly",
                    "Limited automation",
                    "AI capabilities",
                  ],
                  [
                    "Monday.com",
                    "Visual interface",
                    "No enterprise features",
                    "Enterprise focus",
                  ],
                  [
                    "Zapier",
                    "Integration focus",
                    "No workflow management",
                    "Complete solution",
                  ],
                ],
              },
              layout: {
                columns: 12,
                rows: 5,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "financials",
          title: "Financial Projections",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Financial Projections",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "line",
                data: {
                  labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
                  datasets: [
                    {
                      label: "Revenue ($M)",
                      data: [2, 8, 20, 45, 80],
                      borderColor: "#14248a",
                      backgroundColor: "rgba(20, 36, 138, 0.1)",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "Key Metrics:\n• 300% YoY growth\n• 85% gross margin\n• $50K ARR per customer\n• 12-month payback period",
                size: "sm",
                align: "left",
                underline: false,
                color: "#5a5860",
              },
              layout: {
                columns: 4,
                rows: 4,
                align: "center",
                justify: "center",
                columnStart: 9,
              },
            },
          ],
        },
        {
          id: "team",
          title: "Team & Advisors",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Team",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Name", "Role", "Experience", "Background"],
                rows: [
                  [
                    "Sarah Chen",
                    "CEO & Co-founder",
                    "15 years",
                    "Ex-Google, Stanford MBA",
                  ],
                  [
                    "Mike Rodriguez",
                    "CTO & Co-founder",
                    "12 years",
                    "Ex-AWS, MIT PhD",
                  ],
                  [
                    "Lisa Thompson",
                    "VP Sales",
                    "10 years",
                    "Ex-Salesforce, $50M+ revenue",
                  ],
                  [
                    "Dr. James Wilson",
                    "Advisor",
                    "20 years",
                    "Ex-McKinsey, Board member",
                  ],
                ],
              },
              layout: {
                columns: 12,
                rows: 5,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "traction",
          title: "Traction & Milestones",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Traction & Milestones",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiTrendingUp",
                title: "Revenue Growth",
                description: "$2M ARR, 300% YoY growth",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiUsers",
                title: "Customer Base",
                description: "50+ enterprise customers",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 5,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiStar",
                title: "Product Metrics",
                description: "4.8/5 rating, 95% retention",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 9,
              },
            },
          ],
        },
        {
          id: "funding",
          title: "Funding Ask",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Funding Ask",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "$10M Series A",
                size: "xl",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 2,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Use of Funds", "Amount", "Timeline"],
                rows: [
                  ["Product Development", "$4M", "18 months"],
                  ["Sales & Marketing", "$3M", "24 months"],
                  ["Team Expansion", "$2M", "12 months"],
                  ["Working Capital", "$1M", "Ongoing"],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "next-steps",
          title: "Next Steps",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Next Steps",
                size: "lg",
                align: "center",
                color: "#14248a",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiCalendar",
                title: "Due Diligence",
                description: "Complete investor due diligence process",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiFileText",
                title: "Term Sheet",
                description: "Negotiate and finalize term sheet",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 5,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiCheckCircle",
                title: "Close & Launch",
                description: "Close funding and execute growth plan",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 9,
              },
            },
          ],
        },
      ],
    }),
  },
  {
    id: "enterprise-sales",
    name: "Enterprise Sales",
    category: "enterprise",
    description:
      "Professional deck designed for enterprise B2B sales presentations and client pitches",
    slideCount: 10,
    duration: "20-30 minutes",
    difficulty: "Advanced",
    slides: [
      "Executive Summary",
      "Client Challenges",
      "Solution Overview",
      "Value Proposition",
      "Implementation Approach",
      "Success Stories",
      "ROI Analysis",
      "Pricing & Packages",
      "Timeline & Milestones",
      "Next Steps",
    ],
    bestFor: [
      "Enterprise sales",
      "B2B services",
      "Consulting",
      "Software solutions",
    ],
    features: [
      "ROI focused",
      "Case studies",
      "Implementation plan",
      "Executive summary",
    ],
    generateDeck: () => ({
      theme: {
        primaryColor: "#1e40af",
        secondaryColor: "#3b82f6",
        accentColor: "#60a5fa",
        backgroundColor: "#f8fafc",
        fontFamily: "Inter",
        headingFontFamily: "Merriweather",
      },
      slides: [
        {
          id: "executive-summary",
          title: "Executive Summary",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Enterprise Digital Transformation",
                subtext: "Comprehensive solution for Fortune 500 companies",
                size: "xl",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 2,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "• 40% cost reduction in operational efficiency\n• 60% faster time-to-market\n• 300% ROI within 18 months\n• Proven track record with 50+ enterprises",
                size: "md",
                align: "left",
                underline: false,
                color: "#374151",
              },
              layout: {
                columns: 12,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "challenges",
          title: "Client Challenges",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Your Current Challenges",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Challenge", "Current Impact", "Business Risk"],
                rows: [
                  [
                    "Legacy systems",
                    "Slow processes",
                    "Competitive disadvantage",
                  ],
                  [
                    "Data silos",
                    "Poor decision making",
                    "Missed opportunities",
                  ],
                  [
                    "Manual workflows",
                    "High operational costs",
                    "Scalability issues",
                  ],
                  ["Security gaps", "Compliance risks", "Reputation damage"],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "solution",
          title: "Solution Overview",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Enterprise Solution",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiShield",
                title: "Enterprise Security",
                description: "SOC 2 Type II, GDPR, HIPAA compliant",
              },
              layout: {
                columns: 6,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiZap",
                title: "Cloud-Native Platform",
                description: "Scalable, reliable, and always available",
              },
              layout: {
                columns: 6,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 7,
              },
            },
          ],
        },
        {
          id: "value-prop",
          title: "Value Proposition",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Value Proposition",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Benefit", "Quantified Impact", "Time to Value"],
                rows: [
                  ["Cost reduction", "$2M annual savings", "6 months"],
                  ["Efficiency gains", "40% productivity boost", "3 months"],
                  ["Risk mitigation", "99.9% uptime guarantee", "Immediate"],
                  ["Scalability", "10x capacity increase", "12 months"],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "implementation",
          title: "Implementation Approach",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Implementation Roadmap",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiPlay",
                title: "Phase 1: Discovery",
                description: "Requirements gathering and planning (2 weeks)",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiSettings",
                title: "Phase 2: Setup",
                description: "Infrastructure and configuration (4 weeks)",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 4,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiUsers",
                title: "Phase 3: Training",
                description: "User training and adoption (2 weeks)",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 7,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiCheckCircle",
                title: "Phase 4: Go-Live",
                description: "Full deployment and optimization (2 weeks)",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 10,
              },
            },
          ],
        },
        {
          id: "success-stories",
          title: "Success Stories",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Success Stories",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Client", "Industry", "Results", "Timeline"],
                rows: [
                  [
                    "Global Bank",
                    "Financial Services",
                    "50% cost reduction",
                    "8 months",
                  ],
                  ["Tech Corp", "Technology", "3x efficiency gain", "6 months"],
                  [
                    "Manufacturing Co",
                    "Manufacturing",
                    "$5M annual savings",
                    "12 months",
                  ],
                  [
                    "Healthcare System",
                    "Healthcare",
                    "99.9% uptime",
                    "4 months",
                  ],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "roi",
          title: "ROI Analysis",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "ROI Analysis",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "DeckChart",
              props: {
                type: "bar",
                data: {
                  labels: ["Year 1", "Year 2", "Year 3"],
                  datasets: [
                    {
                      label: "ROI (%)",
                      data: [150, 250, 300],
                      backgroundColor: "#1e40af",
                    },
                  ],
                },
              },
              layout: {
                columns: 8,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: "Investment: $2M\nYear 1 ROI: $3M\nYear 2 ROI: $5M\nYear 3 ROI: $6M",
                size: "md",
                align: "left",
                underline: false,
                color: "#374151",
              },
              layout: {
                columns: 4,
                rows: 4,
                align: "center",
                justify: "center",
                columnStart: 9,
              },
            },
          ],
        },
        {
          id: "pricing",
          title: "Pricing & Packages",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Pricing & Packages",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "ComparisonTable",
              props: {
                headers: ["Package", "Features", "Price", "Timeline"],
                rows: [
                  ["Starter", "Core platform + support", "$500K", "6 months"],
                  ["Professional", "Full suite + training", "$1M", "8 months"],
                  ["Enterprise", "Custom + dedicated team", "$2M", "12 months"],
                  ["Premier", "White-label + consulting", "$5M", "18 months"],
                ],
              },
              layout: {
                columns: 12,
                rows: 4,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
        {
          id: "timeline",
          title: "Timeline & Milestones",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Project Timeline",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiCalendar",
                title: "Month 1-2",
                description: "Discovery & Planning",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiSettings",
                title: "Month 3-6",
                description: "Development & Testing",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 4,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiUsers",
                title: "Month 7-8",
                description: "Training & Deployment",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 7,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiCheckCircle",
                title: "Month 9-12",
                description: "Optimization & Support",
              },
              layout: {
                columns: 3,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 10,
              },
            },
          ],
        },
        {
          id: "next-steps",
          title: "Next Steps",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Next Steps",
                size: "lg",
                align: "center",
                color: "#1e40af",
              },
              layout: {
                columns: 12,
                rows: 1,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiFileText",
                title: "Proposal Review",
                description: "Detailed proposal and contract review",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiUsers",
                title: "Stakeholder Meeting",
                description: "Present to key decision makers",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 5,
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiCheckCircle",
                title: "Contract Signing",
                description: "Finalize agreement and begin project",
              },
              layout: {
                columns: 4,
                rows: 3,
                align: "center",
                justify: "center",
                columnStart: 9,
              },
            },
          ],
        },
      ],
    }),
  },
  // Add more templates here...
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
  if (category === "all") return pitchDeckTemplates;
  return pitchDeckTemplates.filter(
    (template) => template.category === category
  );
};
