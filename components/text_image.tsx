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
      className={clsx("flex flex-col w-full py-8 md:py-16 gap-8 md:gap-12", {
        "flex-col": isTop,
        "flex-col-reverse": !isTop,
      })}
    >
      {imageBlok && (
        <div className="w-full">
          <ImageAtom blok={imageBlok} />
        </div>
      )}

      {textBlok && (
        <div className="">
          <Text blok={textBlok} />
        </div>
      )}
    </section>
  );
};
