import type { DeckSpec } from "@/components/Deck/slideTypes";

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
  theme?: Record<string, unknown>;
  componentsCatalog?: unknown[];
  generateDeck?: () => DeckSpec;
}

// Note: Templates are now fetched from the backend API
// This file only contains the interface definition for type safety

// Legacy functions for backward compatibility (now deprecated)
export const getTemplateById = (): PitchDeckTemplate | undefined => {
  return undefined;
};

export const getAllTemplates = (): PitchDeckTemplate[] => {
  return [];
};

export const getTemplatesByCategory = (): PitchDeckTemplate[] => {
  return [];
};
