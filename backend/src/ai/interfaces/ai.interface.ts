// src/ai/interfaces/ai.interface.ts
export interface AIConfiguration {
  openaiApiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface PitchDeckGenerationOptions {
  includeFinancials: boolean;
  includeTeamSlide: boolean;
  slideCount: number;
  presentationDuration: number;
}

export interface SlideTemplate {
  id: string;
  name: string;
  type: SlideType;
  template: string;
  description: string;
}

export type SlideType =
  | "title"
  | "problem"
  | "solution"
  | "market"
  | "business-model"
  | "competitive"
  | "go-to-market"
  | "financial"
  | "team"
  | "funding"
  | "closing"
  | "custom";

export interface ChatContext {
  companyName: string;
  industry: string;
  currentSlide?: number;
  pitchDeckId?: string;
  conversationHistory: ChatMessage[];
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    slideReference?: number;
    actionType?: "generate" | "refine" | "question";
  };
}
