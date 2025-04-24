import { Text } from "./text";
import { ImageAtom, ImageProps } from "./image";
import { storyblokEditable, ISbRichtext } from "@storyblok/react";
import clsx from "clsx";

type TextMultiImageBlok = {
  _uid: string;
  text: Array<{
    _uid: string;
    text: ISbRichtext;
    component: string;
    _editable?: string;
  }>;
  images: Array<ImageProps>;
  image_position?: "top" | "bottom";

  _editable?: string;
  component: "text_multi_image";
};

type TextMultiImageProps = {
  blok: TextMultiImageBlok;
};

export const TextMultiImage = ({ blok }: TextMultiImageProps) => {
  const { text, images, image_position } = blok;
  const isTop = image_position === "top";

  const textBlok = text?.length > 0 ? text[0] : null;

  return (
    <section
      {...storyblokEditable(blok)}
      className={clsx(
        "flex flex-col max-w-[1283px] mx-auto w-full pl-4 pr-6 md:px-[50px] lg:px-0 py-8 md:py-16 gap-8",
        {
          "flex-col": isTop,
          "flex-col-reverse": !isTop,
        }
      )}
    >
      {images && images.length > 0 && (
        <div className={clsx("flex w-full  flex-col gap-8")}>
          {images.map((imageBlok) => (
            <div key={imageBlok._uid} className="w-full">
              <ImageAtom
                blok={{
                  ...imageBlok,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {textBlok && <Text blok={textBlok} className="!px-0" />}
    </section>
  );
};
