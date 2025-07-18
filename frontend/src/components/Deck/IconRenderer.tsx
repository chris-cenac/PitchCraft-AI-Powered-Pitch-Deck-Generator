// src/components/IconRenderer.tsx
import React from "react";
import type { SVGProps } from "react";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
}

const ICON_SETS: Record<
  string,
  Record<string, React.ComponentType<SVGProps<SVGSVGElement>>>
> = {
  fi: FiIcons,
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
  io: IoIcons,
  // Add more sets as needed
};

export const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  size = 24,
  className = "",
}) => {
  if (!name || typeof name !== "string") return null;
  const prefix = name.slice(0, 2).toLowerCase();
  const iconSet = ICON_SETS[prefix];
  const IconComponent = iconSet ? iconSet[name] : undefined;
  const FallbackIcon = FiIcons.FiHelpCircle;
  const RenderIcon = IconComponent || FallbackIcon;
  return <RenderIcon size={size} className={className} />;
};
