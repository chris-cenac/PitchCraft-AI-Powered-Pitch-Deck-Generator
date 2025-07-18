// src/ai/services/template.service.ts
import { Injectable } from "@nestjs/common";
import { SlideTemplate, SlideType } from "../interfaces/ai.interface";

@Injectable()
export class TemplateService {
  private readonly templates: SlideTemplate[] = [
    {
      id: "title-hero",
      name: "Hero Title Slide",
      type: "title",
      template: `
        • Company name with hero styling and gradient
        • Compelling tagline or mission statement
        • Company logo with professional branding
        • Key metrics (founded date, team size, location)
        • Professional color scheme and typography
      `,
      description:
        "Professional hero title slide with company branding and key metrics",
    },
    {
      id: "problem-compelling",
      name: "Compelling Problem Statement",
      type: "problem",
      template: `
        • Market size with compelling data visualization
        • Current market problems with quantified impact
        • Pain points that resonate with target audience
        • Why this problem matters now (timing)
        • Visual elements showing market opportunity
      `,
      description: "Data-driven problem statement with market validation",
    },
    {
      id: "solution-revolutionary",
      name: "Revolutionary Solution",
      type: "solution",
      template: `
        • Solution overview with key benefits
        • Feature list highlighting competitive advantages
        • Performance metrics and improvements
        • Customer testimonials or validation
        • Visual representation of solution impact
      `,
      description: "Solution presentation with benefits and validation",
    },
    {
      id: "market-opportunity",
      name: "Market Opportunity Analysis",
      type: "market",
      template: `
        • Market size breakdown (TAM, SAM, Target)
        • Growth trends and market dynamics
        • Customer lifetime value and acquisition metrics
        • Market timing and tailwinds
        • Visual charts and data presentation
      `,
      description: "Comprehensive market analysis with data visualization",
    },
    {
      id: "business-model-scalable",
      name: "Scalable Business Model",
      type: "business-model",
      template: `
        • Multiple revenue streams with pricing
        • Unit economics and margins
        • Customer acquisition and retention
        • Scalability factors and growth drivers
        • Financial metrics and projections
      `,
      description: "Scalable business model with strong unit economics",
    },
    {
      id: "competitive-advantage",
      name: "Competitive Advantage",
      type: "competitive",
      template: `
        • Competitive landscape analysis
        • Feature comparison with key competitors
        • Unique value propositions
        • Market positioning and differentiation
        • Why you'll win in the market
      `,
      description: "Clear competitive analysis and positioning",
    },
    {
      id: "go-to-market-strategy",
      name: "Go-to-Market Strategy",
      type: "go-to-market",
      template: `
        • Customer acquisition channels
        • Marketing and sales strategy
        • Partnership and distribution approach
        • Customer acquisition cost and payback
        • Growth metrics and targets
      `,
      description: "Comprehensive go-to-market strategy",
    },
    {
      id: "financial-projections",
      name: "Financial Projections",
      type: "financial",
      template: `
        • Revenue growth projections
        • Key financial metrics and KPIs
        • Growth drivers and assumptions
        • Path to profitability
        • Visual charts and data presentation
      `,
      description: "Financial projections with clear growth trajectory",
    },
    {
      id: "team-world-class",
      name: "World-Class Team",
      type: "team",
      template: `
        • Leadership team with backgrounds
        • Key team members and advisors
        • Relevant experience and credentials
        • Team size and experience metrics
        • Why this team can execute
      `,
      description: "Team presentation with proven track record",
    },
    {
      id: "funding-opportunity",
      name: "Investment Opportunity",
      type: "funding",
      template: `
        • Funding amount and use of funds
        • Investment opportunity and returns
        • Milestones and timeline
        • Risk mitigation and execution plan
        • Clear call to action
      `,
      description: "Compelling investment opportunity presentation",
    },
  ];

  getTemplatesByType(type: SlideType): SlideTemplate[] {
    return this.templates.filter((template) => template.type === type);
  }

  getTemplateById(id: string): SlideTemplate | undefined {
    return this.templates.find((template) => template.id === id);
  }

  getAllTemplates(): SlideTemplate[] {
    return this.templates;
  }

  async generateCustomTemplate(
    slideType: SlideType,
    requirements: string
  ): Promise<SlideTemplate> {
    // This would use AI to generate a custom template based on requirements
    return {
      id: `custom-${Date.now()}`,
      name: `Custom ${slideType} Template`,
      type: slideType,
      template: requirements,
      description: "Custom generated template",
    };
  }
}
