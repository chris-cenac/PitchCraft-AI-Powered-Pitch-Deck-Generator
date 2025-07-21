// slideTypes.ts

/**
 * Grid layout configuration for a slide component
 */
export interface SlideLayout {
  /** Number of columns to span (1-12) */
  columns: number;

  /** Optional number of rows to span */
  rows?: number;

  /** Optional starting column line */
  columnStart?: number;

  /** Optional starting row line */
  rowStart?: number;

  /**
   * Vertical alignment within grid cell
   * @default "stretch"
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Horizontal alignment within grid cell
   * @default "stretch"
   */
  justify?: "start" | "center" | "end" | "stretch";
}

/**
 * Type registry for all component properties
 */
export interface ComponentPropsRegistry {
  LabelHeader: {
    text: string;
    subtext?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    variant?: "default" | "hero" | "section";
    gradient?: boolean;
    align?: "left" | "center" | "right";
    underline?: boolean;
    color?: string; // Custom text color override
    underlineColor?: string; // Custom underline color
    icon?: string; // Icon name (e.g., "FiBarChart2")
  };
  MetricCard: {
    title: string;
    value: string;
    subtitle?: string;
    icon?: string;
    variant?: "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg" | "xl";
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    color?: string;
  };
  FeatureList: {
    title?: string;
    features: Array<{
      text: string;
      icon?: string;
      highlight?: boolean;
    }>;
    variant?: "default" | "benefits" | "highlights";
    layout?: "list" | "cards" | "grid";
    columns?: 1 | 2 | 3;
  };
  QuoteCard: {
    quote: string;
    author: string;
    title?: string;
    company?: string;
    variant?: "testimonial" | "quote" | "highlight";
    size?: "sm" | "md" | "lg";
    color?: string;
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
    data: Record<string, unknown>;
    options?: Record<string, unknown>;
    height?: string | number;
    width?: string | number;
    loading?: boolean;
    error?: string;
    className?: string;
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
}

/** Union type of all available component names */
export type ComponentName = keyof ComponentPropsRegistry;

/**
 * A single component on a slide with its properties and layout
 */
export type SlideItem = {
  [K in ComponentName]: {
    name: K;
    props: ComponentPropsRegistry[K];
    layout: SlideLayout;
  };
}[ComponentName];

/**
 * A complete slide containing multiple components
 */
export interface Slide {
  /** Unique slide identifier */
  id: string;

  /** Optional slide title for editor organization */
  title?: string;

  /** Components to render on this slide */
  items: SlideItem[];
}

/**
 * Theme configuration for the entire deck
 */
export interface DeckTheme {
  /** Primary brand color (hex/rgb) */
  primaryColor: string;

  /** Secondary brand color (hex/rgb) */
  secondaryColor: string;

  /** Optional accent color (hex/rgb) */
  accentColor?: string;

  /** Base background color (hex/rgb) */
  backgroundColor?: string;

  /** Font family for all text */
  fontFamily: string;

  /** Optional heading font family */
  headingFontFamily?: string;
}

/**
 * Complete deck specification including slides and theme
 */
export interface DeckSpec {
  /** Ordered collection of slides */
  slides: Slide[];

  /** Global theme settings */
  theme: DeckTheme;

  /** Business data including logo URL */
  businessData?: Record<string, unknown>;
}
