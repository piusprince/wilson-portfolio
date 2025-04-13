"use client";

import React from "react";

import {
  convertAttributesInElement,
  richTextResolver,
  storyblokEditable,
} from "@storyblok/react";
import { Button } from "@/components/ui/button";
import { StarShape1, StarShape2 } from "@/components/ui/icons";
import { options } from "@/lib/richtextUtils";

export type LinkProps = {
  name: string;
  link: {
    id: string;
    url: string;
    email: string;
    linktype: string;
    cached_url: string;
  };
  variant?: "primary" | "secondary" | "button_primary" | "button_secondary";
};

type HeroProps = {
  blok: {
    _uid: string;
    tagline: string;
    with_svg?: boolean;
    link: LinkProps[];
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: any;
  };
};

const getLinkUrl = (link: LinkProps["link"]) => {
  if (link?.linktype === "email") {
    return `mailto:${link.email}`;
  }
  return link?.url;
};

export const Hero = ({ blok }: HeroProps) => {
  const { tagline, with_svg, link, text } = blok;

  const html = richTextResolver(options).render(text);

  const formattedHtml = convertAttributesInElement(html);
  const linkUrl = getLinkUrl(link[0]?.link);
  const linkName = link[0]?.name || "Contact Me";

  return (
    <section
      {...storyblokEditable(blok)}
      data-testid="hero"
      id={blok._uid}
      className="w-full min-h-[80vh] flex items-center justify-center py-12 md:py-24 relative overflow-hidden"
    >
      {with_svg && (
        <>
          <div className="absolute top-10 right-10 md:top-20 md:right-20 lg:top-24 lg:right-32 w-24 h-24 md:w-32 md:h-32">
            <StarShape1 />
          </div>
          <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 lg:bottom-24 lg:left-32 w-24 h-24 md:w-32 md:h-32">
            <StarShape2 />
          </div>
        </>
      )}

      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            {tagline}
          </h1>

          <div className="text-lg md:text-xl text-center max-w-2xl">
            {formattedHtml}
          </div>

          {link && link[0]?.name && (
            <div className="flex flex-col items-center space-y-3 pt-4">
              <Button
                variant="default"
                className="rounded-full bg-black text-white hover:bg-black/90 px-6 py-2 h-auto text-base"
                asChild
              >
                <a href={linkUrl}>{linkName}</a>
              </Button>
              <p className="text-sm">Please reach out to me here 👆</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
