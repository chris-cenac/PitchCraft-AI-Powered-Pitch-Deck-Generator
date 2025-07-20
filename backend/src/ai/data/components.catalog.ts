// src/ai/data/components.catalog.ts

export const COMPONENT_GUIDE = `
# Components: LabelHeader(text), MetricCard(title,value), FeatureList(features), QuoteCard(quote,author), ComparisonTable(headers,rows), DeckChart(type,data), IllustrationFlow(iconName,title,description), LogoDisplay(logoUrl?)

# Layout: Use 12-column grid. Each component needs: columns(1-12), rows(1-12), columnStart(1-12), rowStart(1-12), align(start/center/end), justify(start/center/end)

# Usage: LabelHeader(8-12 cols, titles), MetricCard(2-4 cols, KPIs), FeatureList(6-8 cols, features), QuoteCard(8-10 cols, testimonials), ComparisonTable(10-12 cols, comparisons), DeckChart(8-12 cols, data), IllustrationFlow(3-4 cols, processes), LogoDisplay(2-6 cols, branding)

# Rules: Use each component once, no "undefined", fill required props, professional content, 12-column layouts
`;

export const COMPONENT_NAMES = [
  "LabelHeader",
  "MetricCard",
  "FeatureList",
  "QuoteCard",
  "ComparisonTable",
  "DeckChart",
  "IllustrationFlow",
  "LogoDisplay",
];
