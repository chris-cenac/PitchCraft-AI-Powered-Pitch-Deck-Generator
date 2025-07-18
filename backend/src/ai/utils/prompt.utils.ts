import { ChatContext } from "../interfaces/ai.interface";
// src/ai/utils/prompt.utils.ts
export class PromptUtils {
  static buildSystemPrompt(context: string): string {
    return `
      You are an expert startup pitch deck consultant with extensive experience in helping entrepreneurs create compelling investor presentations. Your expertise includes:
      
      - Venture capital and angel investor expectations
      - Market analysis and competitive positioning
      - Financial modeling and projections
      - Storytelling and narrative structure
      - Visual presentation design principles
      
      Context: ${context}
      
      Always provide actionable, specific advice that helps create professional, investor-ready content.

      ---
      
      When specifying slide layouts, use the following grid system:
      - Each slide is a 12-column grid (columns: 1-12).
      - For each component, the layout object MUST ALWAYS include ALL of the following properties:
        - columns: width (number of columns to span, 1-12)
        - columnStart: left position (starting column, 1-based)
        - rowStart: top position (starting row, 1-based)
        - rows: height (number of rows to span, 1 or more)
      - Do NOT omit any of these properties, even if the value is 1.
      - Example layout for a component:
        {
          "name": "MetricCard",
          "props": { ... },
          "layout": {
            "columns": 4,
            "rows": 2,
            "columnStart": 5,
            "rowStart": 1
          }
        }
      - Place components so they are visually balanced and do not overlap.
      - Use columnStart/rowStart to position components left/right and up/down as needed.
      - Use align/justify for fine-tuned alignment within their grid area (optional).
      - Omitting any of the required layout properties will result in rejection.
    `;
  }

  static buildPitchDeckGenerationPrompt(input: any): string {
    return `
      Create a comprehensive, investor-ready pitch deck for the following startup:
      
      Company Details:
      - Name: ${input.companyName}
      - Industry: ${input.industry}
      - Problem: ${input.problemStatement}
      - Solution: ${input.solution}
      - Business Model: ${input.businessModel}
      - Target Market: ${input.targetMarket}
      ${input.financials ? `- Financials: ${JSON.stringify(input.financials)}` : ""}
      ${input.teamSize ? `- Team Size: ${input.teamSize}` : ""}
      ${input.additionalInfo ? `- Additional Info: ${input.additionalInfo}` : ""}
      
      Requirements:
      1. Create 8-10 slides following standard VC pitch deck structure
      2. Each slide should have:
         - Compelling, concise title
         - 3-5 bullet points of key content
         - Speaker notes (2-3 sentences)
         - Suggested visual elements
      3. Ensure content is investor-focused and data-driven
      4. Include clear value proposition and market opportunity
      5. Address potential investor concerns proactively
      
      Standard slide sequence:
      1. Title/Company Introduction
      2. Problem Statement
      3. Solution
      4. Market Opportunity & Size
      5. Business Model & Revenue Streams
      6. Go-to-Market Strategy
      7. Financial Projections
      8. Team & Advisors
      9. Funding Ask & Use of Funds
      10. Closing & Next Steps

      ---
      
      When specifying slide layouts, use the following grid system:
      - Each slide is a 12-column grid (columns: 1-12).
      - For each component, the layout object MUST ALWAYS include ALL of the following properties:
        - columns: width (number of columns to span, 1-12)
        - columnStart: left position (starting column, 1-based)
        - rowStart: top position (starting row, 1-based)
        - rows: height (number of rows to span, 1 or more)
      - Do NOT omit any of these properties, even if the value is 1.
      - Example layout for a component:
        {
          "name": "MetricCard",
          "props": { ... },
          "layout": {
            "columns": 4,
            "rows": 2,
            "columnStart": 5,
            "rowStart": 1
          }
        }
      - Place components so they are visually balanced and do not overlap.
      - Use columnStart/rowStart to position components left/right and up/down as needed.
      - Use align/justify for fine-tuned alignment within their grid area (optional).
      - Omitting any of the required layout properties will result in rejection.
      
      Format as JSON with proper structure for easy parsing.
    `;
  }

  static buildSlideRegenerationPrompt(
    slide: any,
    feedback: string,
    context: string
  ): string {
    return `
      Improve this pitch deck slide based on the provided feedback:
      
      Current Slide:
      - Title: ${slide.title}
      - Content: ${slide.content}
      - Speaker Notes: ${slide.speakerNotes}
      - Type: ${slide.type}
      
      Company Context: ${context}
      Feedback: ${feedback}
      
      Please regenerate the slide addressing the feedback while:
      1. Maintaining professional investor-ready quality
      2. Keeping content concise and impactful
      3. Ensuring alignment with overall pitch narrative
      4. Including relevant data points where applicable
      5. Suggesting appropriate visual elements
      
      Return the improved slide in JSON format.
    `;
  }

  static buildChatPrompt(message: string, context: ChatContext): string {
    const historyContext = context.conversationHistory
      .slice(-5) // Keep last 5 messages for context
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    return `
      You are helping with a pitch deck for ${context.companyName} in the ${context.industry} industry.
      
      Recent conversation:
      ${historyContext}
      
      Current question/request: ${message}
      
      Provide specific, actionable advice that helps improve the pitch deck. If the user is asking about a specific slide, reference the slide number and provide targeted suggestions.
    `;
  }
}
