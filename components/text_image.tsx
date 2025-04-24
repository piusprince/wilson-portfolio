import { Text } from "./text";
import { ImageAtom, ImageProps } from "./image";
import { storyblokEditable, ISbRichtext } from "@storyblok/react";
import clsx from "clsx";

type TextImageBlok = {
  _uid: string;
  text: Array<{
    _uid: string;
    text: ISbRichtext;
    component: string;
    _editable?: string;
  }>;
  image: Array<ImageProps>;
  image_position: "top" | "bottom";
  _editable?: string;
  component: "text_image";
};

type TextImageProps = {
  blok: TextImageBlok;
};

export const TextImage = ({ blok }: TextImageProps) => {
  const { text, image, image_position } = blok;
  const isTop = image_position === "top";

  const textBlok = text?.length > 0 ? text[0] : null;
  const imageBlok = image?.length > 0 ? image[0] : null;

  return (
    <section
      {...storyblokEditable(blok)}
      className={clsx(
        "flex flex-col w-full max-w-[1283px] mx-auto mb-[72px] md:px-[50px] lg:px-0 pl-4 pr-6",
        {
          "flex-col gap-11": isTop,
          "flex-col-reverse gap-8": !isTop,
        }
      )}
    >
      {imageBlok && (
        <div className="w-full">
          <ImageAtom blok={imageBlok} />
        </div>
      )}

      {textBlok && (
        <div className="text-black [&_*]:text-black">
          <Text blok={textBlok} />
        </div>
      )}
    </section>
  );
};
