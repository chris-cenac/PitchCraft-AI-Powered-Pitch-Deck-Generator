export interface SlideLayout {
  columns: number;
  rows?: number;
  columnStart?: number;
  rowStart?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "stretch";
}

export interface ComponentPropsRegistry {
  LabelHeader: {
    text: string;
    subtext?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    align?: "left" | "center" | "right";
    underline?: boolean;
    color?: string;
    underlineColor?: string;
    icon?: string;
    gradient?: boolean;
    variant?: "default" | "hero" | "section" | "accent";
  };
  ComparisonTable: {
    headers: string[];
    rows: string[][];
    caption?: string;
    highlightCols?: number[];
    highlightRows?: number[];
    variant?: "default" | "striped" | "bordered" | "highlighted";
    className?: string;
    width?: string | number;
    height?: string | number;
  };
  DeckChart: {
    type:
      | "bar"
      | "line"
      | "pie"
      | "doughnut"
      | "polarArea"
      | "radar"
      | "bubble"
      | "scatter";
    data: Record<string, any>;
    options?: Record<string, any>;
  };
  IllustrationFlow: {
    iconName: string;
    title: string;
    description: string;
    width?: number;
    color?: string;
    descriptionColor?: string;
  };
  LogoDisplay: {
    logoUrl?: string | null;
    companyName?: string;
    variant?: "standalone" | "with-text";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    width?: number;
    height?: number;
    circular?: boolean;
    border?: "none" | "light" | "medium" | "accent";
  };
  MetricCard: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    variant?: "default" | "primary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    className?: string;
  };
  FeatureList: {
    title?: string;
    features: Array<{
      text: string;
      icon?: string;
      highlight?: boolean;
      description?: string;
    }>;
    variant?: "default" | "checklist" | "benefits" | "highlights";
    layout?: "grid" | "list" | "cards";
    columns?: 1 | 2 | 3;
    className?: string;
  };
  QuoteCard: {
    quote: string;
    author?: string;
    title?: string;
    company?: string;
    avatar?: string;
    variant?: "default" | "highlight" | "testimonial" | "statistic";
    size?: "sm" | "md" | "lg";
    className?: string;
  };
}

export type ComponentName = keyof ComponentPropsRegistry;

export type SlideItem = {
  [K in ComponentName]: {
    name: K;
    props: ComponentPropsRegistry[K];
    layout: SlideLayout;
  };
}[ComponentName];

export interface Slide {
  id: string;
  title?: string;
  items: SlideItem[];
}

export interface DeckTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  backgroundColor?: string;
  fontFamily: string;
  headingFontFamily?: string;
}

export interface DeckSpec {
  slides: Slide[];
  theme: DeckTheme;
  businessData?: Record<string, any>;
}
