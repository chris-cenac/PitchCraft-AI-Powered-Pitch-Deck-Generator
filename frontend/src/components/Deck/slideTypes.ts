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
    size?: "sm" | "md" | "lg" | "xl";
    align?: "left" | "center" | "right";
    underline?: boolean;
    color?: string; // Custom text color override
    underlineColor?: string; // Custom underline color
    icon?: string; // Icon name (e.g., "FiBarChart2")
  };
  ComparisonTable: {
    headers: string[];
    rows: string[][];
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
}
