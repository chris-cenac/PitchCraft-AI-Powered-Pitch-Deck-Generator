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
    const prompt = `You are an expert pitch deck designer and business strategist. Create a compelling, investor-ready pitch deck that tells a powerful story and showcases the business opportunity.

**CRITICAL REQUIREMENTS:**
- Generate exactly 10 slides following this proven structure
- Use ALL available components creatively and strategically
- Create visually rich, professional layouts that fill the screen
- Make content compelling, data-driven, and investor-focused
- Use the business data provided but enhance it with strategic insights

**SLIDE STRUCTURE (10 slides):**
1. **Title Slide** - Company introduction with hero messaging
2. **Problem Statement** - Pain point with compelling data/story
3. **Solution Overview** - Your unique approach with key benefits
4. **Market Opportunity** - Market size, growth, and timing
5. **Business Model** - Revenue streams and unit economics
6. **Competitive Advantage** - Why you'll win vs alternatives
7. **Go-to-Market Strategy** - How you'll acquire customers
8. **Financial Projections** - Revenue, growth, and key metrics
9. **Team & Advisors** - Why you can execute
10. **Funding Ask** - Investment opportunity and use of funds

**COMPONENT USAGE STRATEGY:**
- **LabelHeader**: Use for slide titles, section headers, and key messaging
- **MetricCard**: Display key metrics, KPIs, financial data, and growth indicators
- **FeatureList**: Show benefits, competitive advantages, product features
- **QuoteCard**: Customer testimonials, market validation, expert opinions
- **DeckChart**: Market data, growth trends, competitive analysis, financial projections
- **ComparisonTable**: Competitive analysis, feature comparisons, market positioning
- **IllustrationFlow**: Process flows, user journeys, business model visualization
- **LogoDisplay**: Company branding, partner logos, customer logos

**LAYOUT PRINCIPLES:**
- Use full 12-column grid effectively
- Create visual hierarchy with different component sizes
- Balance text, data, and visual elements
- Use multiple components per slide for richness
- Ensure professional spacing and alignment

**CONTENT ENHANCEMENT:**
- Transform basic business data into compelling narratives
- Add market research insights and industry trends
- Include realistic but optimistic projections
- Create emotional connection with problem/solution
- Demonstrate clear path to market leadership

**Business Data:**
${JSON.stringify(dto.businessData, null, 2)}

**Available Components:**
${JSON.stringify(dto.componentsCatalog, null, 2)}

**EXAMPLE SLIDE STRUCTURE:**
{
  "id": "problem-statement",
  "title": "The Market Pain Point",
  "items": [
    {
      "name": "LabelHeader",
      "props": {
        "text": "The Problem We're Solving",
        "subtext": "A $50B market opportunity waiting to be captured",
        "size": "xl",
        "variant": "section",
        "underline": true
      },
      "layout": { "columns": 12, "rowStart": 1 }
    },
    {
      "name": "MetricCard",
      "props": {
        "title": "Market Size",
        "value": "$50B",
        "subtitle": "Total Addressable Market",
        "icon": "FiDollarSign",
        "variant": "primary"
      },
      "layout": { "columns": 4, "rowStart": 2 }
    },
    {
      "name": "FeatureList",
      "props": {
        "title": "Current Market Problems",
        "features": [
          { "text": "Inefficient processes cost $15B annually", "icon": "FiAlertTriangle", "highlight": true },
          { "text": "80% of companies struggle with legacy systems", "icon": "FiClock" },
          { "text": "Only 20% achieve digital transformation goals", "icon": "FiTarget" }
        ],
        "variant": "highlights",
        "layout": "cards"
      },
      "layout": { "columns": 8, "rowStart": 2 }
    }
  ]
}

Return ONLY a valid JSON object matching the DeckSpec structure. Focus on creating a compelling narrative that investors will love.`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert pitch deck designer with 15+ years of experience helping startups raise billions in funding. You understand investor psychology, market dynamics, and what makes a pitch deck compelling. Always create professional, data-driven content that tells a powerful story. Respond only with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 6000,
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
                subtext: businessData.tagline || "Revolutionizing the future",
                size: "2xl",
                variant: "hero",
                gradient: true,
                underline: true,
              },
              layout: {
                columns: 12,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LogoDisplay",
              props: {
                companyName: businessData.companyName || "Company",
                variant: "with-text",
                size: "lg",
                circular: true,
                border: "accent",
              },
              layout: {
                columns: 6,
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
                text: "The Problem We're Solving",
                subtext: "A critical market gap that needs addressing",
                size: "xl",
                variant: "section",
                underline: true,
              },
              layout: {
                columns: 12,
                align: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Market Challenges",
                features: [
                  {
                    text:
                      businessData.problemStatement ||
                      "Current solutions are inadequate",
                    icon: "FiAlertTriangle",
                    highlight: true,
                  },
                  {
                    text: "High costs and inefficiencies",
                    icon: "FiDollarSign",
                  },
                  {
                    text: "Poor user experience",
                    icon: "FiUser",
                  },
                ],
                variant: "highlights",
                layout: "cards",
                columns: 3,
              },
              layout: {
                columns: 12,
              },
            },
          ],
        },
        {
          id: "solution",
          title: "Our Solution",
          items: [
            {
              name: "LabelHeader",
              props: {
                text: "Our Revolutionary Solution",
                subtext: "Transforming the industry with innovative technology",
                size: "xl",
                variant: "section",
                underline: true,
              },
              layout: {
                columns: 12,
                align: "center",
              },
            },
            {
              name: "FeatureList",
              props: {
                title: "Key Benefits",
                features: [
                  {
                    text:
                      businessData.proposedSolution ||
                      "Innovative approach to solving the problem",
                    icon: "FiZap",
                    highlight: true,
                  },
                  {
                    text: "10x faster than alternatives",
                    icon: "FiClock",
                  },
                  {
                    text: "Cost-effective solution",
                    icon: "FiTrendingUp",
                  },
                ],
                variant: "benefits",
                layout: "list",
                columns: 1,
              },
              layout: {
                columns: 8,
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Market Impact",
                value: "10x",
                subtitle: "Performance improvement",
                icon: "FiTarget",
                variant: "success",
              },
              layout: {
                columns: 4,
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
