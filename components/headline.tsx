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
      className={cn(
        "font-bold mb-6",
        {
          "text-[var(--h1-size-mobile)] md:text-[var(--h1-size-tablet)] lg:text-[var(--h1-size-desktop)]":
            level === "h1",
          "text-[var(--h2-size-mobile)] md:text-[var(--h2-size-tablet)] lg:text-[var(--h2-size-desktop)]":
            level === "h2",
          "text-[var(--h3-size-mobile)] md:text-[var(--h3-size-tablet)] lg:text-[var(--h3-size-desktop)]":
            level === "h3",
          "text-[var(--h4-size-mobile)] md:text-[var(--h4-size-tablet)] lg:text-[var(--h4-size-desktop)]":
            level === "h4",
          "text-[var(--h5-size-mobile)] md:text-[var(--h5-size-tablet)] lg:text-[var(--h5-size-desktop)]":
            level === "h5",
          "text-[var(--h6-size-mobile)] md:text-[var(--h6-size-tablet)] lg:text-[var(--h6-size-desktop)]":
            level === "h6",
        },
        className
      )}
    >
      {content}
    </HeadingTag>
  );
};

export default Headline;
