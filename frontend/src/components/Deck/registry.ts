// src/components/Deck/registry.ts
import React from "react";
import { LabelHeader } from "./LabelHeader";
import { ComparisonTable } from "./ComparisonTable";
import { DeckChart } from "./DeckChart";
import { IllustrationFlow } from "./IllustrationFlow";
import { LogoDisplay } from "./LogoDisplay";

export const componentRegistry: Record<string, React.FC<any>> = {
  // Header/Label Components
  LabelHeader,

  // Data Visualization Components
  ComparisonTable,
  DeckChart,

  // Content Blocks
  IllustrationFlow,

  // Branding Elements
  LogoDisplay,
};

export interface ComponentPropsMap {
  LabelHeader: React.ComponentProps<typeof LabelHeader>;
  ComparisonTable: React.ComponentProps<typeof ComparisonTable>;
  DeckChart: React.ComponentProps<typeof DeckChart>;
  IllustrationFlow: React.ComponentProps<typeof IllustrationFlow>;
  LogoDisplay: React.ComponentProps<typeof LogoDisplay>;
}

export function isValidComponentName(
  name: string
): name is keyof ComponentPropsMap {
  return name in componentRegistry;
}
