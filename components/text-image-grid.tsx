"use client";

import { storyblokEditable } from "@storyblok/react";

import { Text } from "@/components/text";
import { type ImageProps } from "@/components/image";
import Image from "next/image";

interface TextComponentProps {
  _uid: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  component: string;
  _editable?: string;
}

interface TextImageGridProps {
  blok: {
    _uid: string;
    text: TextComponentProps[];
    image_grid: ImageProps[];
    component: string;
    _editable?: string;
  };
}

export default function TextImageGrid({ blok }: TextImageGridProps) {
  return (
    <section
      {...storyblokEditable(blok)}
      data-testid="text-image-grid"
      id={blok._uid}
      className="container mx-auto pl-4 pr-6 md:px-[50px] xl:px-0 max-w-[1283px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[38px]">
        {blok.text?.map((textBlok) => (
          <Text
            key={textBlok._uid}
            hasMarginBottom={false}
            blok={textBlok}
            className="!px-0"
          />
        ))}

        <div className="grid grid-cols-2 gap-4">
          {blok.image_grid?.map((imageBlok, index) => {
            if (index === 0) {
              return (
                <div
                  key={imageBlok._uid}
                  className="col-span-2 relative w-full h-[370px] rounded-2xl overflow-hidden"
                >
                  <Image
                    data-testid="image"
                    id={imageBlok._uid}
                    src={imageBlok.image.filename}
                    alt={imageBlok.image.alt}
                    // className="w-full h-[650px] object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    fill
                  />
                </div>
              );
            }

            return (
              <div
                key={imageBlok._uid}
                className="relative w-full h-[370px] rounded-2xl overflow-hidden"
              >
                <Image
                  data-testid="image"
                  id={imageBlok._uid}
                  src={imageBlok.image.filename}
                  alt={imageBlok.image.alt}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 1}
                  fill
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
