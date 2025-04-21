"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "./ui/icons";
import { ISbResponse } from "@storyblok/react";
import { getStoryblokLinkUrl, type StoryblokLink } from "@/lib/utils";
import Headline, { HeadlineProps } from "./headline";

interface LinkItem {
  _uid: string;
  link: StoryblokLink;
  name: string;
  variant: string;
  component: string;
  _editable?: string;
}

interface SubFooterItem {
  _uid: string;
  name: string;
  links: LinkItem[];
  component: string;
  _editable?: string;
}

type FooterProps = Readonly<{
  blok: {
    _uid: string;
    link: LinkItem[];
    headline: HeadlineProps[];
    sub_footer: SubFooterItem[];
    component: string;
    _editable?: string;
  } & ISbResponse["data"]["story"]["content"];
}>;

export default function Footer({ blok }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const ctaButton = blok.link[0];
  const subFooter = blok.sub_footer[0];

  return (
    <footer className="w-full bg-gray-50">
      <div className="container px-6 py-16 mx-auto md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="w-full md:w-auto">
            <Link href="/" className="text-2xl font-bold">
              <Logo className="w-[47px] h-[47px]  lg:w-[82px] lg:h-[87px]" />
              <span className="sr-only">Home</span>
            </Link>
          </div>

          {(blok.headline?.length > 0 || ctaButton) && (
            <div className="flex flex-col items-center md:items-start max-w-[559px]">
              {blok.headline?.length > 0 && (
                <div className="mb-4">
                  {blok.headline.map((item: HeadlineProps) => (
                    <Headline
                      key={item._uid}
                      content={item.content}
                      level={item.level}
                      className="text-2xl font-bold text-gray-800"
                    />
                  ))}
                </div>
              )}

              {ctaButton?.name && (
                <div className="relative">
                  <Button variant={ctaButton.variant} asChild>
                    <Link href={getStoryblokLinkUrl(ctaButton.link)}>
                      {ctaButton.name}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {subFooter && (
        <div className="container px-6 py-4 mx-auto md:px-10">
          <div className="flex flex-col items-center justify-between md:flex-row">
            {subFooter.name && (
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600">
                  © {currentYear} {subFooter.name}
                </p>
              </div>
            )}

            {subFooter.links?.length > 0 && (
              <nav className="flex space-x-6">
                {subFooter.links.map((item: LinkItem) => (
                  <Link
                    key={item._uid}
                    href={getStoryblokLinkUrl(item.link)}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
