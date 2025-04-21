"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "./ui/icons";
import { ISbResponse } from "@storyblok/react";
import { getStoryblokLinkUrl, type StoryblokLink } from "@/lib/utils";

interface LinkItem {
  _uid: string;
  link: StoryblokLink;
  name: string;
  variant: string;
  component: string;
  _editable?: string;
}

interface HeadlineItem {
  _uid: string;
  level: string;
  content: string;
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
    headline: HeadlineItem[];
    sub_footer: SubFooterItem[];
    component: string;
    _editable?: string;
  } & ISbResponse["data"]["story"]["content"];
}>;

export default function Footer({ blok }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const mainHeadline = blok.headline[0];
  const ctaButton = blok.link[0];
  const subFooter = blok.sub_footer[0];

  return (
    <footer className="w-full bg-gray-50">
      <div className="container px-6 py-16 mx-auto md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="w-full md:w-auto">
            <Link href="/" className="text-2xl font-bold">
              <Logo className="w-[82px] h-[87px]" />
              <span className="sr-only">Home</span>
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-start max-w-[559px]">
            {mainHeadline && (
              <h2 className="mb-8 text-2xl font-bold text-center text-black md:text-3xl md:text-left">
                {mainHeadline.content}
              </h2>
            )}

            {ctaButton && (
              <div className="relative">
                <div className="absolute w-full transform -translate-x-1/2 -top-8 left-1/2">
                  <div className="w-full border-t border-gray-300 border-dashed"></div>
                </div>
                <Button asChild>
                  <Link href={getStoryblokLinkUrl(ctaButton.link)}>
                    {ctaButton.name}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container px-6 py-4 mx-auto md:px-10">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © {currentYear} {subFooter.name}
              </p>
            </div>

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
              {subFooter.links.length === 0 && (
                <span className="text-sm text-gray-600">
                  No links available
                </span>
              )}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
