import { renderRichText, storyblokEditable } from "@storyblok/react";
import clsx from "clsx";
import DOMPurify from "isomorphic-dompurify";

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
  const html = renderRichText(blok.text);

  return (
    <section
      {...storyblokEditable(blok)}
      data-testid="text"
      id={blok._uid}
      className={clsx(
        "w-full max-w-[1283px] pl-4 pr-6 md:px-[50px] lg:px-0 mx-auto relative overflow-hidden",
        className
      )}
    >
      {html && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
      )}
    </section>
  );
};
