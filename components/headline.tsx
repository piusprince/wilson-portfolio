import type React from "react";
import type { JSX } from "react/jsx-runtime";

export interface HeadlineProps {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  content: string;
  className?: string;
}

const Headline: React.FC<HeadlineProps> = ({
  level = "h2",
  content,
  className = "",
}) => {
  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={`font-bold text-3xl md:text-4xl mb-6 ${className}`}>
      {content}
    </HeadingTag>
  );
};

export default Headline;
