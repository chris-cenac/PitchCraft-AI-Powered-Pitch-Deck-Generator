// src/ai/data/components.catalog.ts

import { ComponentPropsRegistry, SlideLayout } from "../../common/slide-types";

export interface ComponentDefinition<
  K extends keyof ComponentPropsRegistry = keyof ComponentPropsRegistry,
> {
  name: K;
  props: ComponentPropsRegistry[K];
  layout: SlideLayout;
}

export const COMPONENT_CATALOG: ComponentDefinition[] = [
  {
    name: "LabelHeader",
    props: {
      text: "Your Title",
      subtext: "Optional subtitle",
      size: "lg",
      align: "center",
      underline: true,
      color: "#000",
      underlineColor: "#666",
      icon: "FiBarChart2",
    },
    layout: {
      columns: 12,
      align: "center",
      justify: "center",
    },
  },
  {
    name: "ComparisonTable",
    props: {
      headers: ["Competitor", "Our Solution"],
      rows: [
        ["Old Tech", "AI-based"],
        ["Expensive", "Affordable"],
      ],
    },
    layout: {
      columns: 12,
    },
  },
  {
    name: "DeckChart",
    props: {
      type: "bar",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Revenue",
            data: [10000, 15000, 20000, 25000],
            backgroundColor: "#4CAF50",
          },
        ],
      },
    },
    layout: {
      columns: 12,
    },
  },
  {
    name: "IllustrationFlow",
    props: {
      iconName: "FiTarget",
      title: "Problem",
      description: "The market faces X, and our product solves Y.",
    },
    layout: {
      columns: 12,
    },
  },
  {
    name: "LogoDisplay",
    props: {
      logoUrl: null,
      companyName: "Example Inc.",
      variant: "with-text",
      size: "md",
      circular: true,
      border: "light",
    },
    layout: {
      columns: 6,
    },
  },
];
