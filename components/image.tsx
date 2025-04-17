import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import clsx from "clsx";

export enum ImageSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type ImageProps = {
  _uid: string;
  size?: ImageSize;
  image: {
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    source: string;
    filename: string;
    copyright: string;
    fieldtype: "asset";
    meta_data: Record<string, unknown>;
    is_external_url: boolean;
  };
  component: "image_component";
  removeMargin?: boolean; // Add this prop to control margin
};

const getHeightClass = (size?: ImageSize): string => {
  switch (size) {
    case ImageSize.LARGE:
      return "h-[650px]";
    case ImageSize.MEDIUM:
      return "h-[500px]";
    case ImageSize.SMALL:
      return "h-[300px]";
    default:
      return "h-auto";
  }
};

export const ImageAtom = ({ blok }: { blok: ImageProps }) => {
  const heightClass = getHeightClass(blok.size);

  return (
    <div
      {...storyblokEditable(blok)}
      data-testid="image"
      id={blok._uid}
      className={clsx(
        "w-full relative rounded-2xl overflow-hidden",
        heightClass
        // !blok.removeMargin && "mb-11"
      )}
    >
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        fill
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};
