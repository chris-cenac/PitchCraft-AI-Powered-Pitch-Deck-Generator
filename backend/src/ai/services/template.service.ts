// src/ai/services/template.service.ts
import { Injectable } from "@nestjs/common";
import { SlideTemplate, SlideType } from "../interfaces/ai.interface";
import { pitchDeckTemplates } from "../data/templates.data";

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
  theme: Record<string, any>;
  componentsCatalog: any[];
  generateDeck?: () => {
    slides: Array<{
      id: string;
      title: string;
      items: Array<{
        name: string;
        props: Record<string, any>;
        layout: {
          columns: number;
          rows?: number;
          columnStart?: number;
          rowStart?: number;
          align?: "start" | "center" | "end" | "stretch";
          justify?: "start" | "center" | "end" | "stretch";
        };
      }>;
    }>;
    theme: Record<string, any>;
  };
}

@Injectable()
export class TemplateService {
  private readonly templates: PitchDeckTemplate[] = pitchDeckTemplates;

  getAllTemplates(): PitchDeckTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): PitchDeckTemplate | undefined {
    return this.templates.find((template) => template.id === id);
  }

  getTemplatesByCategory(category: string): PitchDeckTemplate[] {
    return this.templates.filter((template) => template.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.templates.map((template) => template.category))];
  }

  // Legacy methods for backward compatibility
  private readonly slideTemplates: SlideTemplate[] = [
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
  ];

  getSlideTemplates(): SlideTemplate[] {
    return this.slideTemplates;
  }

  getSlideTemplateById(id: string): SlideTemplate | undefined {
    return this.slideTemplates.find((template) => template.id === id);
  }

  getSlideTemplatesByType(type: SlideType): SlideTemplate[] {
    return this.slideTemplates.filter((template) => template.type === type);
  }
}
