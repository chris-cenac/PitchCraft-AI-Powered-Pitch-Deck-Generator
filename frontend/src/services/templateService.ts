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
  console.warn("getTemplateById is deprecated. Use backend API instead.");
  return undefined;
};

export const getAllTemplates = (): PitchDeckTemplate[] => {
  console.warn("getAllTemplates is deprecated. Use backend API instead.");
  return [];
};

export const getTemplatesByCategory = (): PitchDeckTemplate[] => {
  console.warn(
    "getTemplatesByCategory is deprecated. Use backend API instead."
  );
  return [];
};
