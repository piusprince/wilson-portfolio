"use client";

import { storyblokEditable } from "@storyblok/react";

import { Text } from "@/components/text";
import { ImageAtom, type ImageProps } from "@/components/image";

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
      className="container mx-auto py-16 max-w-[1283px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          {blok.text?.map((textBlok) => (
            <Text key={textBlok._uid} blok={textBlok} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blok.image_grid?.map((imageBlok, index) => {
            if (index === 0) {
              return (
                <div key={imageBlok._uid} className="md:col-span-2">
                  <ImageAtom blok={imageBlok} />
                </div>
              );
            }

            return (
              <div key={imageBlok._uid}>
                <ImageAtom blok={imageBlok} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
