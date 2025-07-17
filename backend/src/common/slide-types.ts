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
    size?: "sm" | "md" | "lg" | "xl";
    align?: "left" | "center" | "right";
    underline?: boolean;
    color?: string;
    underlineColor?: string;
    icon?: string;
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
}
