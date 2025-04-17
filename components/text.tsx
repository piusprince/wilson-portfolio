import { options } from "@/lib/richtextUtils";
import {
  convertAttributesInElement,
  richTextResolver,
  storyblokEditable,
} from "@storyblok/react";

type TextProps = {
  _uid: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  component: string;
  _editable?: string;
};

export const Text = ({ blok }: { blok: TextProps }) => {
  const html = richTextResolver(options).render(blok.text);
  const formattedHtml = convertAttributesInElement(html);

  return (
    <div
      {...storyblokEditable(blok)}
      data-testid="text"
      id={blok._uid}
      className="w-full relative overflow-hidden"
    >
      {formattedHtml && (
        <div className="prose prose-lg max-w-none ">{formattedHtml}</div>
      )}
    </div>
  );
};
