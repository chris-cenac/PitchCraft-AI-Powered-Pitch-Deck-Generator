// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "outline"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg";
  rounded?: "default" | "full";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  rounded = "default",
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-gradient-to-tr from-blue-600 to-violet-600 text-white hover:from-violet-600 hover:to-blue-600 focus:ring-blue-400 dark:focus:ring-offset-neutral-900",
    secondary:
      "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-700 dark:focus:ring-neutral-600 dark:focus:ring-offset-neutral-900",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-700 dark:focus:ring-offset-neutral-900",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-700 dark:focus:ring-offset-neutral-900",
    warning:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-700 dark:focus:ring-offset-neutral-900",
    outline:
      "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-200 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:focus:ring-blue-900 dark:focus:ring-offset-neutral-900",
    ghost:
      "text-blue-600 hover:bg-blue-50 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:focus:ring-blue-900 dark:focus:ring-offset-neutral-900",
    link: "text-blue-600 underline hover:text-blue-800 focus:ring-blue-200 dark:text-blue-400 dark:hover:text-blue-300 dark:focus:ring-blue-900 dark:focus:ring-offset-neutral-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const roundness = {
    default: "rounded-lg",
    full: "rounded-full",
  };

  const iconSpacing = icon ? (iconPosition === "left" ? "pr-2" : "pl-2") : "";
  const iconOnly = !children && icon ? "p-2" : "";

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    roundness[rounded],
    {
      "opacity-50 cursor-not-allowed": disabled,
      "pointer-events-none": disabled,
      "flex-row-reverse": iconPosition === "right",
    },
    iconSpacing,
    iconOnly,
    className
  );

  const content = (
    <>
      {icon && <span className={children ? "shrink-0" : ""}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
