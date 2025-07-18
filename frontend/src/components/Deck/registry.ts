// src/components/Deck/registry.ts
import React from "react";
import { LabelHeader } from "./LabelHeader";
import { ComparisonTable } from "./ComparisonTable";
import { DeckChart } from "./DeckChart";
import { IllustrationFlow } from "./IllustrationFlow";
import { LogoDisplay } from "./LogoDisplay";
import { MetricCard } from "./MetricCard";
import { FeatureList } from "./FeatureList";
import { QuoteCard } from "./QuoteCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // New Professional Components
  MetricCard,
  FeatureList,
  QuoteCard,
};

export interface ComponentPropsMap {
  LabelHeader: React.ComponentProps<typeof LabelHeader>;
  ComparisonTable: React.ComponentProps<typeof ComparisonTable>;
  DeckChart: React.ComponentProps<typeof DeckChart>;
  IllustrationFlow: React.ComponentProps<typeof IllustrationFlow>;
  LogoDisplay: React.ComponentProps<typeof LogoDisplay>;
  MetricCard: React.ComponentProps<typeof MetricCard>;
  FeatureList: React.ComponentProps<typeof FeatureList>;
  QuoteCard: React.ComponentProps<typeof QuoteCard>;
}

export function isValidComponentName(
  name: string
): name is keyof ComponentPropsMap {
  return name in componentRegistry;
}
