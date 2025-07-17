// src/ai/services/template.service.ts
import { Injectable } from "@nestjs/common";
import { SlideTemplate, SlideType } from "../interfaces/ai.interface";

@Injectable()
export class TemplateService {
  private readonly templates: SlideTemplate[] = [
    {
      id: "title-default",
      name: "Company Introduction",
      type: "title",
      template: `
        • Company name and tagline
        • Founded date and location
        • Brief mission statement
        • Key differentiator in one sentence
      `,
      description: "Standard title slide with company overview",
    },
    {
      id: "problem-pain-point",
      name: "Problem Statement",
      type: "problem",
      template: `
        • Current market pain point
        • Size and scope of the problem
        • Existing solutions and their limitations
        • Why this problem matters now
      `,
      description: "Comprehensive problem definition slide",
    },
    {
      id: "solution-product",
      name: "Solution Overview",
      type: "solution",
      template: `
        • Core solution description
        • Key features and benefits
        • Competitive advantages
        • Proof of concept or validation
      `,
      description: "Product/service solution presentation",
    },
    {
      id: "market-tam-sam",
      name: "Market Opportunity",
      type: "market",
      template: `
        • Total Addressable Market (TAM)
        • Serviceable Addressable Market (SAM)
        • Target market segments
        • Market growth trends
      `,
      description: "Market sizing and opportunity analysis",
    },
    {
      id: "business-model-revenue",
      name: "Business Model",
      type: "business-model",
      template: `
        • Revenue streams
        • Pricing strategy
        • Customer acquisition model
        • Unit economics
      `,
      description: "Revenue and business model slide",
    },
    {
      id: "financial-projections",
      name: "Financial Projections",
      type: "financial",
      template: `
        • 3-5 year revenue projections
        • Key financial metrics
        • Funding requirements
        • Path to profitability
      `,
      description: "Financial forecast and metrics",
    },
    {
      id: "team-founders",
      name: "Team & Advisors",
      type: "team",
      template: `
        • Founder backgrounds
        • Key team members
        • Advisory board
        • Relevant experience
      `,
      description: "Team introduction and credentials",
    },
    {
      id: "closing-ask",
      name: "Funding Ask",
      type: "closing",
      template: `
        • Funding amount requested
        • Use of funds breakdown
        • Milestones to be achieved
        • Next steps and timeline
      `,
      description: "Investment ask and next steps",
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
