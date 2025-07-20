import { ChatContext } from "../interfaces/ai.interface";
import { COMPONENT_GUIDE } from "../data/components.catalog";

export class PromptUtils {
  static buildSystemPrompt(context: string): string {
    return `Expert pitch deck designer. Generate investor-ready decks using JSON schema. Use 12-column grid layouts. Context: ${context}. ${COMPONENT_GUIDE} Output valid JSON only.`;
  }

  static buildPitchDeckGenerationPrompt(input: any): string {
    // Clean the input to remove Mongoose metadata and only include essential business data
    const cleanInput = {
      companyName: input.companyName || input.businessData?.companyName,
      tagline: input.tagline || input.businessData?.tagline,
      logoUrl: input.logoUrl || input.businessData?.logoUrl,
      industry: input.industry || input.businessData?.industry,
      businessStage: input.businessStage || input.businessData?.businessStage,
      problemStatement:
        input.problemStatement || input.businessData?.problemStatement,
      targetAudience:
        input.targetAudience || input.businessData?.targetAudience,
      proposedSolution:
        input.proposedSolution || input.businessData?.proposedSolution,
      uniqueValueProposition:
        input.uniqueValueProposition ||
        input.businessData?.uniqueValueProposition,
      revenueModel: input.revenueModel || input.businessData?.revenueModel,
      pricingStrategy:
        input.pricingStrategy || input.businessData?.pricingStrategy,
      goToMarketStrategy:
        input.goToMarketStrategy || input.businessData?.goToMarketStrategy,
      marketSize: input.marketSize || input.businessData?.marketSize,
      competitors: input.competitors || input.businessData?.competitors,
      founders: input.founders || input.businessData?.founders,
      teamSize: input.teamSize || input.businessData?.teamSize,
      visionStatement:
        input.visionStatement || input.businessData?.visionStatement,
      longTermGoals: input.longTermGoals || input.businessData?.longTermGoals,
      designStyle: input.designStyle || input.businessData?.designStyle,
    };

    return `Generate 12-slide pitch deck for: ${JSON.stringify(cleanInput, null, 2)}

Requirements:
1. 12 slides: Cover, Problem, Market, Solution, Features, Business Model, GTM, Traction, Financials, Competition, Team, Ask
2. Use 12-column grid layouts with columnStart/rowStart positioning
3. Use each component type once: LabelHeader, MetricCard, FeatureList, QuoteCard, ComparisonTable, DeckChart, IllustrationFlow, LogoDisplay
4. Professional content, no "undefined", fill required props
5. Output valid JSON with "slides" array and "theme" object
6. Each slide: id, title, items array with name, props, layout objects
7. Layout: columns(1-12), rows(1-12), columnStart(1-12), rowStart(1-12), align, justify

Output JSON only.`;
  }

  // New method for chunked generation
  static buildSlideChunkPrompt(input: any, slideNumbers: number[]): string {
    const cleanInput = {
      companyName: input.companyName || input.businessData?.companyName,
      industry: input.industry || input.businessData?.industry,
      problemStatement:
        input.problemStatement || input.businessData?.problemStatement,
      proposedSolution:
        input.proposedSolution || input.businessData?.proposedSolution,
      uniqueValueProposition:
        input.uniqueValueProposition ||
        input.businessData?.uniqueValueProposition,
    };

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

    const requestedSlides = slideNumbers
      .map((num) => `${num}: ${slideTypes[num - 1]}`)
      .join(", ");

    return `Generate slides ${requestedSlides} for: ${JSON.stringify(cleanInput, null, 2)}

Requirements:
1. Create exactly ${slideNumbers.length} slides with specified types
2. Use 12-column grid layouts with proper positioning
3. Use appropriate components for each slide type
4. Professional content, no "undefined"
5. Output valid JSON array of slide objects
6. Each slide: id, title, items array with name, props, layout

Output JSON array only.`;
  }

  static buildSlideRegenerationPrompt(
    slide: any,
    feedback: string,
    context: string
  ): string {
    return `
      You are an expert pitch deck designer. Improve the following slide based on the feedback, using the component guide provided.
      
      # Current Slide
      - id: ${slide.id}
      - title: ${slide.title}
      - items: ${JSON.stringify(slide.items)}
      
      # Company Context
      ${context}
      
      # Feedback
      ${feedback}
      
      # Requirements
      - Maintain professional, investor-ready quality
      - Keep content concise and impactful
      - Use a variety of components as appropriate
      - Layout: Use a 12-column grid with detailed positioning
      - Include columns, rows, columnStart, rowStart, align, justify for all items
      - Create visual hierarchy and balanced layouts
      - Output must be valid JSON, no explanations
      
      # Layout Guidelines
      - Position components strategically using columnStart and rowStart
      - Create visual hierarchy with different component sizes
      - Use spacing effectively by leaving empty grid areas
      - Mix different component types for visual variety
      
      # Output Format
      {
        "id": "slide-id",
        "title": "Slide Title",
        "items": [
          {
            "name": "LabelHeader",
            "props": { /* ... */ },
            "layout": { 
              "columns": 12, 
              "rows": 2,
              "columnStart": 1,
              "rowStart": 1,
              "align": "center", 
              "justify": "center" 
            }
          }
          // ... more items
        ]
      }
      // End of sample
      
      WARNING: Do not include any explanations, only output valid JSON conforming to the schema.
    `;
  }

  static buildChatPrompt(message: string, context: ChatContext): string {
    const historyContext = context.conversationHistory
      .slice(-5)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    return `
      You are an expert pitch deck consultant for ${context.companyName} in the ${context.industry} industry.
      
      Recent conversation:
      ${historyContext}
      
      Current question/request: ${message}
      
      # Instructions
      - Reference slide numbers where relevant
      - Suggest specific improvements using the allowed components and layout schema
      - Output must be actionable and concise
      - Do not include any explanations unless explicitly asked
    `;
  }
}
