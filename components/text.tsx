import { options } from "@/lib/richtextUtils";
import {
  convertAttributesInElement,
  richTextResolver,
  storyblokEditable,
} from "@storyblok/react";
import clsx from "clsx";

type TextProps = {
  _uid: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  component: string;
  _editable?: string;
};

export const Text = ({
  blok,
  className,
}: {
  blok: TextProps;
  className?: string;
}) => {
  const html = richTextResolver(options).render(blok.text);
  const formattedHtml = convertAttributesInElement(html);

  return (
    <div
      {...storyblokEditable(blok)}
      data-testid="text"
      id={blok._uid}
      className={clsx("w-full relative overflow-hidden", className)}
    >
      {formattedHtml && (
        <div className="prose prose-lg max-w-none ">{formattedHtml}</div>
      )}
    </div>
  );
};
