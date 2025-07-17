// ai.service.ts
import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { CreatePitchDeckDto } from "./dto/ai.dto";
import { PromptUtils } from "./utils/prompt.utils";
import { DeckSpec } from "./interfaces/deck-spec.interface";

export interface PitchDeckInput {
  companyName: string;
  industry: string;
  problemStatement: string;
  solution: string;
  businessModel: string;
  targetMarket: string;
  financials?: {
    revenue?: string;
    funding?: string;
    projections?: string;
    costs?: string;
    financialMilestones?: string;
  };
  teamSize?: number;
  additionalInfo?: string;
  tagline?: string;
  websiteUrl?: string;
  businessStage?: string;
  targetAudience?: string;
  uniqueValueProposition?: string;
  pricingStrategy?: string;
  goToMarketStrategy?: string;
  competitors?: string;
  founders?: string;
  advisors?: string;
  fundingStage?: string;
  amountRaised?: string;
  visionStatement?: string;
  longTermGoals?: string;
  exitStrategy?: string;
  designStyle?: string;
  brandColors?: string;
}

export interface SlideContent {
  title: string;
  content: string;
  speakerNotes: string;
  suggestedImages: string[];
  type:
    | "title"
    | "problem"
    | "solution"
    | "market"
    | "business-model"
    | "financial"
    | "team"
    | "closing";
}

export interface PitchDeckOutline {
  slides: SlideContent[];
  overallNotes: string;
  duration: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  private mapDtoToPitchDeckInput(dto: CreatePitchDeckDto): PitchDeckInput {
    return {
      companyName: dto.companyName,
      industry: dto.industry,
      problemStatement: dto.problemStatement,
      solution: dto.solution,
      businessModel: dto.businessModel,
      targetMarket: dto.targetMarket,
      financials: dto.financials
        ? {
            revenue: dto.financials.revenue,
            funding: dto.financials.funding || dto.amountRaised,
            projections: dto.financials.projections,
            costs: dto.financials.costs,
            financialMilestones: dto.financials.financialMilestones,
          }
        : undefined,
      teamSize: dto.teamSize,
      tagline: dto.tagline,
      websiteUrl: dto.websiteUrl,
      businessStage: dto.businessStage,
      targetAudience: dto.targetAudience,
      uniqueValueProposition: dto.uniqueValueProposition,
      pricingStrategy: dto.pricingStrategy,
      goToMarketStrategy: dto.goToMarketStrategy,
      competitors: dto.competitors,
      founders: dto.founders,
      advisors: dto.advisors,
      fundingStage: dto.fundingStage,
      amountRaised: dto.amountRaised,
      visionStatement: dto.visionStatement,
      longTermGoals: dto.longTermGoals,
      exitStrategy: dto.exitStrategy,
      designStyle: dto.designStyle,
      brandColors: dto.brandColors,
      additionalInfo: this.buildAdditionalInfo(dto),
    };
  }

  private buildAdditionalInfo(dto: CreatePitchDeckDto): string {
    if (!dto) return "";

    const fieldMap: [keyof CreatePitchDeckDto, string][] = [
      ["tagline", "Tagline"],
      ["websiteUrl", "Website"],
      ["businessStage", "Business Stage"],
      ["targetAudience", "Target Audience"],
      ["uniqueValueProposition", "Unique Value Proposition"],
      ["pricingStrategy", "Pricing Strategy"],
      ["goToMarketStrategy", "Go-to-Market Strategy"],
      ["competitors", "Competitors"],
      ["founders", "Founders"],
      ["advisors", "Advisors"],
      ["fundingStage", "Funding Stage"],
      ["visionStatement", "Vision"],
      ["longTermGoals", "Long-term Goals"],
      ["exitStrategy", "Exit Strategy"],
      ["designStyle", "Design Style"],
      ["brandColors", "Brand Colors"],
    ];

    return fieldMap
      .filter(([key]) => dto[key])
      .map(([key, label]) => `${label}: ${dto[key]}`)
      .join(". ");
  }

  async generatePitchDeckOutline(
    dto: CreatePitchDeckDto
  ): Promise<PitchDeckOutline> {
    const input = this.mapDtoToPitchDeckInput(dto);
    const prompt = PromptUtils.buildPitchDeckGenerationPrompt(input);

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: PromptUtils.buildSystemPrompt(
            input.companyName + " - " + input.industry
          ),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI response content is empty");

    return this.parsePitchDeckResponse(content, input);
  }

  async regenerateSlide(
    slideContent: SlideContent,
    feedback: string,
    companyContext: string
  ): Promise<SlideContent> {
    const prompt = PromptUtils.buildSlideRegenerationPrompt(
      slideContent,
      feedback,
      companyContext
    );

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: PromptUtils.buildSystemPrompt(companyContext),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI response content is empty");

    const parsed = JSON.parse(content);
    return {
      ...slideContent,
      title: parsed.title,
      content: parsed.content,
      speakerNotes: parsed.speakerNotes,
      suggestedImages: parsed.suggestedImages || [],
    };
  }

  async generateSpeakerNotes(
    slideTitle: string,
    slideContent: string,
    companyContext: string
  ): Promise<string> {
    const prompt = `Generate detailed speaker notes for a slide titled "${slideTitle}" with the following content:\n${slideContent}\n\nContext: ${companyContext}`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: PromptUtils.buildSystemPrompt(companyContext),
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const notes = response.choices[0].message.content;
    if (!notes) throw new Error("AI response content is empty");

    return notes;
  }

  async refineContent(content: string, instructions: string): Promise<string> {
    const prompt = `Refine the following content based on these instructions:\n\nContent: ${content}\n\nInstructions: ${instructions}`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional editor for investor decks.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const refined = response.choices[0].message.content;
    if (!refined) throw new Error("AI response content is empty");

    return refined;
  }

  async generateImageSuggestions(
    slideTitle: string,
    slideContent: string
  ): Promise<string[]> {
    const prompt = `Suggest 3-5 professional images/icons that would enhance this slide:\n\nTitle: ${slideTitle}\n\nContent: ${slideContent}`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a visual design expert for pitch decks.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI response content is empty");

    return content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  private parsePitchDeckResponse(
    content: string,
    input: PitchDeckInput
  ): PitchDeckOutline {
    try {
      const parsed = JSON.parse(content);
      return {
        slides: parsed.slides.map((slide, idx) => ({
          title: slide.title,
          content: slide.content,
          speakerNotes: slide.speakerNotes,
          suggestedImages: slide.suggestedImages || [],
          type: this.getSlideType(idx),
        })),
        overallNotes: parsed.overallNotes || "Present with confidence.",
        duration: parsed.duration || "10-15 minutes",
      };
    } catch (e) {
      this.logger.error("Failed to parse pitch deck response", e);
      return this.createFallbackPitchDeck(input);
    }
  }

  private getSlideType(index: number): SlideContent["type"] {
    const types: SlideContent["type"][] = [
      "title",
      "problem",
      "solution",
      "market",
      "business-model",
      "financial",
      "team",
      "closing",
    ];
    return types[index] || "title";
  }

  private createFallbackPitchDeck(input: PitchDeckInput): PitchDeckOutline {
    return {
      slides: [
        {
          title: `${input.companyName} Overview`,
          content: `• ${input.tagline}\n• Industry: ${input.industry}\n• ${input.uniqueValueProposition}`,
          speakerNotes: `Today we present ${input.companyName}, a company in the ${input.industry} industry...`,
          suggestedImages: ["company logo", "founder photo"],
          type: "title",
        },
      ],
      overallNotes: "Fallback outline used due to JSON parsing issue.",
      duration: "8-10 minutes",
    };
  }

  async generateDeck(dto: {
    businessData: any;
    componentsCatalog: any[];
  }): Promise<DeckSpec> {
    const prompt = `You are an AI that generates pitch deck JSON for a React app.

**Instructions:**
- Generate exactly 10 slides, one for each of the following sections, in this order:
  1. Company Introduction (Title)
  2. Problem Statement
  3. Solution
  4. Market Opportunity & Size
  5. Business Model & Revenue Streams
  6. Go-to-Market Strategy
  7. Financial Projections
  8. Team & Advisors
  9. Funding Ask & Use of Funds
  10. Closing & Next Steps
- Use ALL available components from the following registry: LabelHeader, ComparisonTable, DeckChart, IllustrationFlow, LogoDisplay.
- Each slide should use multiple components and fill the screen (use all 12 columns, multiple rows, and varied layouts).
- For factual business info (tagline, financials, founders, etc.), use the provided data as-is.
- For other content (problem, solution, market, team, etc.), you may elaborate, rephrase, or add context to make the deck more compelling and investor-friendly.
- Make the deck visually rich and engaging.
- Return ONLY a valid JSON object matching this DeckSpec type:

{
  "slides": [ ... ],
  "theme": { ... }
}

**Example Slide:**
{
  "id": "problem-solution",
  "title": "The Data Dilemma",
  "items": [
    {
      "name": "LabelHeader",
      "props": { "text": "The Problem", "size": "xl", "underline": true },
      "layout": { "columns": 12, "rowStart": 1 }
    },
    {
      "name": "DeckChart",
      "props": { "type": "pie", "data": { "labels": ["Unstructured Data", "Manual Processing", "Inaccurate Insights", "Actionable Data"], "datasets": [{ "data": [45, 25, 20, 10], "backgroundColor": ["#ef4444", "#f97316", "#eab308", "#22c55e"] }] }, "options": { "plugins": { "title": { "display": true, "text": "Data Utilization Breakdown" }, "legend": { "position": "right" } } } },
      "layout": { "columns": 6, "rowStart": 2 }
    },
    {
      "name": "ComparisonTable",
      "props": { "headers": ["Feature", "Ours", "Competitor"], "rows": [["Real-time Analytics", "✓", "✗"], ["Predictive Modeling", "✓", "Basic"]] },
      "layout": { "columns": 6, "rowStart": 2 }
    }
  ]
}

**Business Data:**
${JSON.stringify(dto.businessData, null, 2)}

**Available Components:**
${JSON.stringify(dto.componentsCatalog, null, 2)}

Return ONLY the JSON object:`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a JSON-only AI assistant. Always respond with valid JSON objects only. Never include explanatory text, markdown, or any other formatting.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI response content is empty");

    try {
      // Try to extract JSON if the response contains other text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonContent = jsonMatch ? jsonMatch[0] : content;

      const parsed = JSON.parse(jsonContent) as DeckSpec;

      // Validate the structure
      if (!parsed.slides || !Array.isArray(parsed.slides)) {
        throw new Error("Invalid DeckSpec structure: missing slides array");
      }

      return parsed;
    } catch (e) {
      this.logger.error("Invalid DeckSpec JSON", e);
      this.logger.error("Raw AI response:", content);

      // Return a fallback DeckSpec
      return this.createFallbackDeckSpec(dto.businessData);
    }
  }

  private createFallbackDeckSpec(businessData: any): DeckSpec {
    return {
      slides: [
        {
          id: "title",
          title: businessData.companyName || "Company Overview",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: businessData.companyName || "Company Name",
                size: "xl",
                align: "center",
              },
              layout: {
                columns: 12,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LabelHeader",
              props: {
                text: businessData.tagline || "Your tagline here",
                size: "lg",
                align: "center",
              },
              layout: {
                columns: 12,
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
                size: "xl",
                underline: true,
              },
              layout: {
                columns: 12,
                align: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiTarget",
                title: "Problem",
                description:
                  businessData.problemStatement ||
                  "Describe the problem your solution addresses.",
              },
              layout: {
                columns: 12,
              },
            },
          ],
        },
      ],
      theme: {
        primaryColor: "#2563eb",
        secondaryColor: "#0ea5e9",
        accentColor: "#8b5cf6",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f8fafc",
      },
    };
  }
}
