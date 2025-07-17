import { SlideLayout, ComponentPropsRegistry } from "../../common/slide-types";

export interface SlideItem {
  name: keyof ComponentPropsRegistry;
  props: ComponentPropsRegistry[SlideItem["name"]];
  layout: SlideLayout;
}

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
