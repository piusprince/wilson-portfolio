import type React from "react";
import type { JSX } from "react/jsx-runtime";
import { storyblokEditable } from "@storyblok/react";
import { cn } from "@/lib/utils";

export interface HeadlineProps {
  _uid?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  content: string;
  className?: string;
}

const Headline: React.FC<HeadlineProps> = ({
  _uid,
  level = "h2",
  content,
  className = "",
}) => {
  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      key={_uid}
      data-testid="headline"
      id={_uid}
      {...storyblokEditable({ _uid })}
      // Remove conditional size classes, keep base styles and passed className
      className={cn("font-bold mb-6", className)}
    >
      {content}
    </HeadingTag>
  );
};

export default Headline;
