"use client";

import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import clsx from "clsx";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
  removeMargin?: boolean;
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
    <Dialog>
      <div
        {...storyblokEditable(blok)}
        data-testid="image"
        id={blok._uid}
        className={clsx(
          "w-full relative rounded-2xl overflow-hidden group",
          heightClass
        )}
      >
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <DialogTrigger asChild>
          <button
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Expand image"
          >
            <Expand className="w-5 h-5 text-gray-800" />
          </button>
        </DialogTrigger>
      </div>

      <DialogContent
        aria-describedby={undefined}
        className="w-[90vw] h-[90vh] bg-transparent border-0"
      >
        <div className="relative w-full h-full bg-black/80 rounded-lg">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
          <DialogTrigger asChild>
            <button
              className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full"
              aria-label="Close expanded image"
            >
              <Expand className="w-5 h-5 text-gray-800 rotate-180" />
            </button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};
