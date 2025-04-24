"use client";

import React from "react";

import { renderRichText, storyblokEditable } from "@storyblok/react";
import { Button } from "@/components/ui/button";
import { StarShape1, StarShape2 } from "@/components/ui/icons";

import { getStoryblokLinkUrl, type StoryblokLink } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";

export type LinkProps = {
  _uid?: string;
  name: string;
  link: StoryblokLink;
  variant?: "primary" | "secondary" | "button_primary" | "button_secondary";
};

type HeroProps = Readonly<{
  blok: {
    _uid: string;
    tagline: string;
    with_svg?: boolean;
    link: LinkProps[];
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: any;
  };
}>;

export const Hero = ({ blok }: HeroProps) => {
  const { tagline, with_svg, link, text } = blok;

  const html = renderRichText(text);
  const linkUrl = link?.[0]?.link ? getStoryblokLinkUrl(link[0].link) : "#";
  const linkName = link?.[0]?.name ?? "Contact Me";
  const buttonVariant = link?.[0]?.variant ?? "primary";

  return (
    <section
      {...storyblokEditable(blok)}
      data-testid="hero"
      id={blok._uid}
      className="w-full xl:min-h-[73vh] flex items-center justify-center py-12 md:py-24 relative overflow-hidden"
    >
      {with_svg && (
        <>
          <div className="absolute top-4 right-4 md:top-20 md:right-20 lg:top-24 lg:right-32">
            <StarShape1 className="h-[30px] w-[30px] md:h-[66px] md:w-[66px] xl:w-[169px] xl:h-[169px]" />
          </div>
          <div className="absolute bottom-4 left-4 md:bottom-20 md:left-20 lg:bottom-24 lg:left-32">
            <StarShape2 className="h-[30px] w-[30px] md:h-[66px] md:w-[66px] xl:w-[169px] xl:h-[169px]" />
          </div>
        </>
      )}

      <div className="container max-w-3xl px-8 md:px-6">
        <div className="flex flex-col items-center gap-2 text-center md:gap-3 lg:gap-4">
          {tagline && (
            <h1 className="text-4xl font-semibold tracking-tighter text-black md:text-[3.25rem] lg:text-[5rem]">
              {tagline}
            </h1>
          )}

          {html && (
            <div
              className="max-w-2xl mb-3 text-[0.8125rem] text-center md:text-[1rem] lg:text-[1.25rem]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html),
              }}
            />
          )}

          {link?.[0]?.name && (
            <div className="flex flex-col items-center gap-2">
              <Button
                hideIcon
                variant={buttonVariant}
                className="text-base"
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
