import { storyblokEditable } from "@storyblok/react";
import Headline, { HeadlineProps } from "./headline";
import clsx from "clsx";

type HeadlineBlokProps = {
  blok: {
    _uid: string;
    level?: HeadlineProps["level"];
    content: HeadlineProps["content"];
    className?: HeadlineProps["className"];
    component: string;
    _editable?: string;
  };
};
export default function HeadlineBlok({ blok }: HeadlineBlokProps) {
  const { _uid, level, content, className } = blok;

  return (
    <Headline
      key={_uid}
      level={level}
      content={content}
      className={clsx("text-black text-center mb-8", className)}
      {...storyblokEditable(blok)}
      data-testid="headline-blok"
    />
  );
}
