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
    // Only send essential fields for outline
    const minimalInput = {
      companyName: dto.companyName,
      industry: dto.industry,
      problemStatement: this.truncate(dto.problemStatement, 200),
      solution: this.truncate(dto.solution, 200),
      uniqueValueProposition: this.truncate(dto.uniqueValueProposition, 200),
    };
    // Minimal system prompt for outline
    const minimalSystemPrompt =
      "You are an expert pitch deck consultant. Generate a high-level outline for an investor pitch deck. Only output slide titles and a 1-2 sentence description for each.";
    const prompt = `Generate a 10-slide outline for a pitch deck for the following startup.\n\n# Startup Data\n${JSON.stringify(minimalInput, null, 2)}\n\n# Output Format\n[\n  {\n    \"title\": \"...\",\n    \"content\": \"...\"\n  },\n  ...\n]\n`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: minimalSystemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI response content is empty");

    // Parse as array of slides
    let slides: any[] = [];
    try {
      slides = JSON.parse(content);
    } catch {
      // Try to extract JSON array from text
      const match = content.match(/\[.*\]/s);
      if (match) {
        slides = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse outline response");
      }
    }
    // Return as PitchDeckOutline
    return {
      slides: slides.map((s, idx) => ({
        title: s.title,
        content: s.content,
        speakerNotes: "",
        suggestedImages: [],
        type: this.getSlideType(idx),
      })),
      overallNotes: "Present with confidence.",
      duration: "10-15 minutes",
    };
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
    } catch {
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

  // Utility to truncate long fields
  private truncate(str: string | undefined, max = 400): string | undefined {
    if (!str) return str;
    return str.length > max ? str.slice(0, max) + "..." : str;
  }

  // Utility to filter out empty fields
  private filterNonEmpty(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, v]) => v !== undefined && v !== null && v !== ""
      )
    );
  }

  // Utility: Extract JSON from AI output
  private extractJson(content: string): any {
    try {
      // Try direct parse
      return JSON.parse(content);
    } catch (e) {
      this.logger.error("Direct JSON parse failed:", e.message);

      // Try to extract JSON object/array from text
      const match = content.match(/[\[{][\s\S]*[\]}]/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (e2) {
          this.logger.error("Failed to parse extracted JSON:", e2.message);
        }
      }

      // Try to fix common JSON issues
      try {
        const fixedContent = this.fixCommonJsonIssues(content);
        return JSON.parse(fixedContent);
      } catch (e3) {
        this.logger.error("Failed to parse fixed JSON:", e3.message);
      }

      // Try to extract and fix truncated JSON
      try {
        const fixedContent = this.fixTruncatedJson(content);
        return JSON.parse(fixedContent);
      } catch (e4) {
        this.logger.error("Failed to parse truncated JSON:", e4.message);
      }

      this.logger.error("Failed to extract JSON from AI output:", content);
      return null;
    }
  }

  // Utility: Fix common JSON issues
  private fixCommonJsonIssues(content: string): string {
    let fixed = content;

    // Find the last complete JSON object
    const jsonMatch = content.match(/\{[\s\S]*\}/g);
    if (jsonMatch && jsonMatch.length > 0) {
      // Take the last complete JSON object
      fixed = jsonMatch[jsonMatch.length - 1];
    }

    // Fix unclosed quotes in strings
    fixed = fixed.replace(/"([^"]*?)(?=\s*[,}\]])/g, '"$1"');

    // Fix missing closing brackets
    const openBraces = (fixed.match(/\{/g) || []).length;
    const closeBraces = (fixed.match(/\}/g) || []).length;
    const openBrackets = (fixed.match(/\[/g) || []).length;
    const closeBrackets = (fixed.match(/\]/g) || []).length;

    // Add missing closing brackets
    for (let i = 0; i < openBraces - closeBraces; i++) {
      fixed += "}";
    }
    for (let i = 0; i < openBrackets - closeBrackets; i++) {
      fixed += "]";
    }

    return fixed;
  }

  // Utility: Fix truncated JSON responses
  private fixTruncatedJson(content: string): string {
    let fixed = content.trim();

    // If content ends with incomplete object/array, try to complete it
    if (fixed.endsWith('"') || fixed.endsWith(",")) {
      // Remove trailing comma or incomplete string
      fixed = fixed.replace(/[",\s]*$/, "");
    }

    // Count brackets and braces to see what's missing
    const openBraces = (fixed.match(/\{/g) || []).length;
    const closeBraces = (fixed.match(/\}/g) || []).length;
    const openBrackets = (fixed.match(/\[/g) || []).length;
    const closeBrackets = (fixed.match(/\]/g) || []).length;

    // If we have more opening than closing, add the missing ones
    for (let i = 0; i < openBraces - closeBraces; i++) {
      fixed += "}";
    }
    for (let i = 0; i < openBrackets - closeBrackets; i++) {
      fixed += "]";
    }

    // If content looks like it was truncated mid-object, try to close it properly
    if (fixed.includes('"slides"') && !fixed.includes('"theme"')) {
      // Looks like we have slides but no theme, add a basic theme
      fixed =
        fixed.replace(/,\s*$/, "") +
        ', "theme": {"primaryColor": "#3B82F6", "secondaryColor": "#1E40AF", "fontFamily": "Arial, sans-serif"}}';
    }

    // If content looks like it was truncated mid-array, try to close it
    if (fixed.startsWith("[") && !fixed.endsWith("]")) {
      fixed += "]";
    }

    return fixed;
  }

  // Utility: Validate businessData for required fields
  private validateBusinessData(businessData: any): void {
    const required = [
      "companyName",
      "industry",
      "problemStatement",
      "proposedSolution",
      "uniqueValueProposition",
    ];
    for (const field of required) {
      if (
        !businessData[field] ||
        typeof businessData[field] !== "string" ||
        !businessData[field].trim()
      ) {
        throw new BadRequestException(
          `Missing or invalid required field: ${field}`
        );
      }
    }
  }

  // Utility: Validate DeckSpec structure
  private validateDeckSpec(spec: any): boolean {
    return spec && Array.isArray(spec.slides) && spec.slides.length > 0;
  }

  // Utility: Retry OpenAI call
  private async withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
    let lastErr;
    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        if (i < retries) {
          const delay = Math.pow(2, i) * 500;
          await new Promise((res) => setTimeout(res, delay));
        }
      }
    }
    throw lastErr;
  }

  async generateDeck(dto: {
    businessData: any;
  }): Promise<{ deck: DeckSpec; usedFallback: boolean }> {
    try {
      this.validateBusinessData(dto.businessData);
    } catch (err) {
      this.logger.error("Validation error in businessData:", err);
      throw err;
    }
    // Truncate long fields and filter out empty fields
    const fieldsToTruncate = [
      "problemStatement",
      "solution",
      "businessModel",
      "targetMarket",
      "uniqueValueProposition",
      "goToMarketStrategy",
      "competitors",
      "founders",
      "advisors",
      "visionStatement",
      "longTermGoals",
      "exitStrategy",
      "designStyle",
      "tagline",
      "pricingStrategy",
      "additionalInfo",
    ];
    const truncatedBusinessData: Record<string, any> = { ...dto.businessData };
    for (const key of fieldsToTruncate) {
      if (truncatedBusinessData[key]) {
        truncatedBusinessData[key] = this.truncate(truncatedBusinessData[key]);
      }
    }
    // Remove empty fields
    const filteredBusinessData = this.filterNonEmpty(truncatedBusinessData);

    // Use the strict prompt from PromptUtils
    const input = {
      companyName: filteredBusinessData.companyName || "",
      industry: filteredBusinessData.industry || "",
      ...filteredBusinessData,
    };
    let prompt = PromptUtils.buildPitchDeckGenerationPrompt(input);
    const systemPrompt = PromptUtils.buildSystemPrompt(
      input.companyName + " - " + input.industry
    );
    // Token calculation logic

    // --- Token calculation logic ---
    let promptTokens: number = 0;
    // Try to use tiktoken if available, otherwise estimate by word count
    let tiktokenAvailable = false;
    try {
      // Dynamically import tiktoken if available (optional dependency)
      // @ts-ignore
      const tiktoken = await import("@dqbd/tiktoken");
      if (tiktoken && tiktoken.encoding_for_model) {
        const enc = tiktoken.encoding_for_model("gpt-4");
        const systemPrompt = PromptUtils.buildSystemPrompt(
          input.companyName + " - " + input.industry
        );
        promptTokens =
          enc.encode(systemPrompt).length + enc.encode(prompt).length;
        tiktokenAvailable = true;
      }
    } catch {
      // tiktoken not installed or failed to load, fallback to estimation
      tiktokenAvailable = false;
    }
    if (!tiktokenAvailable) {
      // Fallback: estimate tokens as 1.3x word count
      const systemPrompt = PromptUtils.buildSystemPrompt(
        input.companyName + " - " + input.industry
      );
      const wordCount =
        systemPrompt.split(/\s+/).length + prompt.split(/\s+/).length;
      promptTokens = Math.ceil(wordCount * 1.3);
    }
    const MAX_CONTEXT = 8192;
    // Set a more conservative completion limit to avoid truncation
    const maxTokens = Math.min(3000, MAX_CONTEXT - promptTokens);
    if (maxTokens < 1000) {
      // If prompt is so large that completion would be too small, throw a user-friendly error
      throw new Error(
        `Your input is too large to generate a pitch deck. Please reduce the amount of information or try again with less detail.`
      );
    }

    try {
      let attempts = 0;
      const maxAttempts = 2;

      while (attempts < maxAttempts) {
        attempts++;

        const response = await this.withRetry(() =>
          this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: PromptUtils.buildSystemPrompt(
                  input.companyName + " - " + input.industry
                ),
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.4,
            max_tokens: maxTokens,
          })
        );

        const content = response.choices[0].message.content;
        if (!content) throw new Error("AI response content is empty");

        const parsed = this.extractJson(content);
        if (this.validateDeckSpec(parsed)) {
          return { deck: parsed, usedFallback: false };
        } else {
          this.logger.error(
            `Invalid DeckSpec structure from AI (attempt ${attempts}/${maxAttempts}), using fallback.`
          );

          if (attempts < maxAttempts) {
            // Add a more specific instruction for the retry
            const retryPrompt =
              prompt +
              "\n\nIMPORTANT: The previous response had JSON formatting errors. Please ensure all JSON is properly formatted with complete quotes, brackets, and braces. Focus on creating valid JSON structure.";

            // Update the prompt for retry
            prompt = retryPrompt;
            continue;
          }
        }
      }

      // If all attempts failed, use fallback
      return {
        deck: this.createFallbackDeckSpec(dto.businessData),
        usedFallback: true,
      };
    } catch (err: any) {
      this.logger.error("OpenAI error in generateDeck:", err);
      if (
        err?.message?.includes("maximum context length") ||
        err?.message?.includes("tokens")
      ) {
        throw new Error(
          "The pitch deck could not be generated because the input is too large for the AI model. Please reduce the amount of information and try again."
        );
      }
      // Fallback
      return {
        deck: this.createFallbackDeckSpec(dto.businessData),
        usedFallback: true,
      };
    }
  }

  /**
   * Multi-stage deck generation: outline first, then each slide.
   */
  async generateDeckMultiStage(dto: {
    businessData: any;
  }): Promise<{ deck: DeckSpec; usedFallback: boolean }> {
    try {
      this.validateBusinessData(dto.businessData);
    } catch (err) {
      this.logger.error("Validation error in businessData:", err);
      throw err;
    }
    // 1. Generate outline (slide titles and short descriptions)
    let outline;
    try {
      outline = await this.withRetry(() =>
        this.generatePitchDeckOutline(dto.businessData)
      );
    } catch (err) {
      this.logger.error("Failed to generate outline, using fallback:", err);
      return {
        deck: this.createFallbackDeckSpec(dto.businessData),
        usedFallback: true,
      };
    }
    if (!outline || !outline.slides || outline.slides.length === 0) {
      this.logger.error("Empty outline from AI, using fallback.");
      return {
        deck: this.createFallbackDeckSpec(dto.businessData),
        usedFallback: true,
      };
    }
    // 2. For each slide, generate detailed content
    const slides: any[] = [];
    let usedFallback = false;
    // Generate outline for multi-stage approach
    for (const outlineSlide of outline.slides) {
      try {
        const prompt = `You are an expert pitch deck designer. Generate detailed content for a pitch deck slide with the following information.\n\n# Slide Title\n${outlineSlide.title}\n\n# Slide Description\n${outlineSlide.content}\n\n# Company Context\n${JSON.stringify(dto.businessData, null, 2)}\n\n# Requirements\n- Output valid JSON for a slide object with title, content, speakerNotes, suggestedImages, and type.\n- Do not include explanations, only output valid JSON.`;
        const response = await this.withRetry(() =>
          this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: PromptUtils.buildSystemPrompt(
                  dto.businessData.companyName +
                    " - " +
                    dto.businessData.industry
                ),
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.6,
            max_tokens: 800,
          })
        );
        const content = response.choices[0].message.content;
        if (!content) throw new Error("AI response content is empty");
        const parsed = this.extractJson(content);
        if (parsed && parsed.title && parsed.content) {
          slides.push(parsed);
        } else {
          this.logger.error(
            "Invalid slide structure from AI, using outline slide as fallback."
          );
          slides.push({
            title: outlineSlide.title,
            content: outlineSlide.content,
            speakerNotes:
              outlineSlide.speakerNotes || "Present with confidence.",
            suggestedImages: outlineSlide.suggestedImages || [],
            type: outlineSlide.type || "custom",
          });
          usedFallback = true;
        }
      } catch (err) {
        this.logger.error(
          "OpenAI error in slide generation, using outline slide as fallback:",
          err
        );
        slides.push({
          title: outlineSlide.title,
          content: outlineSlide.content,
          speakerNotes: outlineSlide.speakerNotes || "Present with confidence.",
          suggestedImages: outlineSlide.suggestedImages || [],
          type: outlineSlide.type || "custom",
        });
        usedFallback = true;
      }
    }
    // 3. Assemble the deck
    const defaultTheme = {
      primaryColor: "#2563eb",
      secondaryColor: "#059669",
      accentColor: "#f59e42",
      backgroundColor: "#ffffff",
      fontFamily: "Inter, system-ui, sans-serif",
      headingFontFamily: "Inter, system-ui, sans-serif",
    };
    return {
      deck: { slides, theme: defaultTheme },
      usedFallback,
    };
  }

  /**
   * Chunked deck generation: Generate slides in smaller batches to avoid token limits
   */
  async generateDeckChunked(dto: {
    businessData: any;
  }): Promise<{ deck: DeckSpec; usedFallback: boolean }> {
    try {
      this.validateBusinessData(dto.businessData);
    } catch (err) {
      this.logger.error("Validation error in businessData:", err);
      throw err;
    }

    // Generate slides in chunks of 3-4 slides each
    const slideChunks = [
      [1, 2, 3, 4], // Cover, Problem, Market, Solution
      [5, 6, 7, 8], // Features, Business Model, GTM, Traction
      [9, 10, 11, 12], // Financials, Competition, Team, Ask
    ];

    const allSlides: any[] = [];
    let usedFallback = false;

    for (let i = 0; i < slideChunks.length; i++) {
      const chunk = slideChunks[i];
      try {
        const chunkSlides = await this.generateSlideChunk(
          dto.businessData,
          chunk
        );
        allSlides.push(...chunkSlides);
      } catch (err) {
        this.logger.error(
          `Failed to generate chunk ${i + 1}, using fallback:`,
          err
        );
        // Generate fallback slides for this chunk
        const fallbackSlides = this.createFallbackSlidesForChunk(
          dto.businessData,
          chunk
        );
        allSlides.push(...fallbackSlides);
        usedFallback = true;
      }
    }

    // Create the complete deck spec
    const deck: DeckSpec = {
      slides: allSlides,
      theme: {
        primaryColor: "#3B82F6",
        secondaryColor: "#1E40AF",
        accentColor: "#60A5FA",
        backgroundColor: "#FFFFFF",
        fontFamily: "Arial, sans-serif",
        headingFontFamily: "Arial, sans-serif",
      },
    };

    return { deck, usedFallback };
  }

  /**
   * Generate a specific chunk of slides
   */
  private async generateSlideChunk(
    businessData: any,
    slideNumbers: number[]
  ): Promise<any[]> {
    const input = {
      companyName: businessData.companyName || "",
      industry: businessData.industry || "",
      ...this.filterNonEmpty(businessData),
    };

    const prompt = PromptUtils.buildSlideChunkPrompt(input, slideNumbers);
    const systemPrompt = PromptUtils.buildSystemPrompt(
      input.companyName + " - " + input.industry
    );

    // Calculate tokens more conservatively for chunked generation
    const wordCount =
      systemPrompt.split(/\s+/).length + prompt.split(/\s+/).length;
    const estimatedTokens = Math.ceil(wordCount * 1.3);
    const maxTokens = Math.min(2000, 8192 - estimatedTokens); // More conservative token limit

    const response = await this.withRetry(() =>
      this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: maxTokens,
      })
    );

    const content = response.choices[0].message.content;
    if (!content) throw new Error("AI response content is empty");

    const parsed = this.extractJson(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }

    throw new Error("Failed to parse slide chunk response");
  }

  /**
   * Create fallback slides for a specific chunk
   */
  private createFallbackSlidesForChunk(
    businessData: any,
    slideNumbers: number[]
  ): any[] {
    const slideTypes = [
      "Cover & Company Overview",
      "The Problem",
      "Market Size & Opportunity",
      "Our Solution",
      "Product Features & Benefits",
      "Business Model",
      "Go-To-Market Strategy",
      "Traction & Metrics",
      "Financials & Projections",
      "Competitive Analysis",
      "Team & Advisors",
      "The Ask & Use of Funds",
    ];

    return slideNumbers.map((slideNum) => ({
      id: `slide${slideNum}`,
      title: slideTypes[slideNum - 1],
      items: [
        {
          name: "LabelHeader",
          props: {
            text: slideTypes[slideNum - 1],
            size: "xl",
            align: "center",
            variant: "section",
          },
          layout: {
            columns: 12,
            rows: 2,
            rowStart: 1,
            align: "center",
            justify: "center",
          },
        },
        {
          name: "FeatureList",
          props: {
            features: [
              { text: "Feature 1", icon: "check", highlight: true },
              { text: "Feature 2", icon: "check", highlight: true },
              { text: "Feature 3", icon: "check", highlight: true },
            ],
            title: "Key Points",
            variant: "highlights",
            layout: "cards",
            columns: 3,
          },
          layout: {
            columns: 12,
            rows: 6,
            columnStart: 1,
            rowStart: 3,
          },
        },
      ],
    }));
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
                align: "center",
                color: "#2563eb",
              },
              layout: {
                columns: 12,
                rows: 3,
                columnStart: 1,
                rowStart: 2,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "LogoDisplay",
              props: {
                companyName: businessData.companyName || "Company",
                variant: "standalone",
                size: "xl",
                circular: true,
                border: "accent",
              },
              layout: {
                columns: 4,
                rows: 2,
                columnStart: 5,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Industry",
                value: businessData.industry || "Technology",
                subtitle: "Sector",
                icon: "FiBriefcase",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 2,
                rows: 1,
                columnStart: 2,
                rowStart: 9,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Stage",
                value: businessData.businessStage || "Startup",
                subtitle: "Company Stage",
                icon: "FiTrendingUp",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 2,
                rows: 1,
                columnStart: 6,
                rowStart: 9,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Team",
                value: businessData.teamSize?.toString() || "5+",
                subtitle: "Team Size",
                icon: "FiUsers",
                variant: "primary",
                size: "sm",
              },
              layout: {
                columns: 2,
                rows: 1,
                columnStart: 10,
                rowStart: 9,
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
                align: "center",
                color: "#2d3748",
              },
              layout: {
                columns: 12,
                rows: 2,
                columnStart: 1,
                rowStart: 3,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiAlertTriangle",
                title: "Market Gap",
                description:
                  businessData.problemStatement ||
                  "Current solutions are inadequate",
                color: "#e53e3e",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 1,
                rowStart: 8,
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
                  "Inefficient processes cost businesses billions annually",
                color: "#d69e2e",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 5,
                rowStart: 6,
                align: "center",
                justify: "center",
              },
            },
            {
              name: "IllustrationFlow",
              props: {
                iconName: "FiUser",
                title: "Poor UX",
                description: "Users struggle with complex, outdated solutions",
                color: "#38a169",
              },
              layout: {
                columns: 4,
                rows: 3,
                columnStart: 9,
                rowStart: 8,
                align: "center",
                justify: "center",
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
                align: "center",
                color: "#059669",
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
              name: "FeatureList",
              props: {
                title: "Key Benefits",
                features: [
                  {
                    text:
                      businessData.proposedSolution ||
                      "Innovative approach to solving the problem",
                    icon: "FiZap",
                  },
                  {
                    text: "10x faster than alternatives",
                    icon: "FiClock",
                  },
                  {
                    text: "Cost-effective solution",
                    icon: "FiTrendingUp",
                  },
                  {
                    text: "User-friendly interface",
                    icon: "FiUser",
                  },
                ],
                variant: "highlights",
              },
              layout: {
                columns: 6,
                rows: 4,
                columnStart: 4,
                rowStart: 7,
                align: "start",
                justify: "start",
              },
            },
            {
              name: "MetricCard",
              props: {
                title: "Performance",
                value: "10x",
                subtitle: "Faster than alternatives",
                icon: "FiTarget",
                variant: "primary",
                size: "md",
              },
              layout: {
                columns: 5,
                rows: 2,
                columnStart: 5,
                rowStart: 5,
                align: "center",
                justify: "center",
              },
            },
          ],
        },
      ],
      theme: {
        primaryColor: "#2563eb",
        secondaryColor: "#059669",
        accentColor: "#f59e42",
        backgroundColor: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif",
        headingFontFamily: "Inter, system-ui, sans-serif",
      },
    };
  }
}
