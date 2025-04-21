"use client";

import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { QuoteIcon } from "lucide-react";

import type { ImageProps } from "@/components/image";

interface QuoteProps {
  blok: {
    _uid: string;
    name: string;
    text: string;
    image: ImageProps[];
    company: string;
    position: string;
    component: string;
    _editable?: string;
  };
}

export default function Quote({ blok }: QuoteProps) {
  const profileImage = blok.image?.[0];

  return (
    <section
      {...storyblokEditable(blok)}
      data-testid="quote"
      id={blok._uid}
      className="container mx-auto px-6 py-16 md:px-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        {blok.text && (
          <div className="mb-8 relative">
            <QuoteIcon className="text-gray-200 h-16 w-16 absolute -top-8 -left-4 opacity-50" />
            <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10">
              &ldquo;{blok.text}&rdquo;
            </p>
          </div>
        )}

        {(blok.name || blok.position || blok.company) && (
          <div className="flex items-center justify-center">
            {profileImage && (
              <div className="mr-4 w-12 h-12 rounded-full overflow-hidden relative">
                <Image
                  src={profileImage.image.filename || "/placeholder.svg"}
                  alt={profileImage.image.alt || `Photo of ${blok.name}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}

            <div className="text-left">
              {blok.name && <p className="font-medium">{blok.name}</p>}
              {(blok.position || blok.company) && (
                <p className="text-sm text-gray-600">
                  {blok.position}
                  {blok.position && blok.company && " at "}
                  {blok.company}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
