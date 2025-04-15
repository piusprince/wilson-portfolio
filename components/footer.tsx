"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./ui/icons";
import { ISbResponse } from "@storyblok/react";

interface LinkItem {
  _uid: string;
  link: {
    id: string;
    url: string;
    target?: string;
    linktype: string;
    fieldtype: string;
    cached_url: string;
  };
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

interface FooterProps {
  blok: {
    _uid: string;
    link: LinkItem[];
    headline: HeadlineItem[];
    sub_footer: SubFooterItem[];
    component: string;
    _editable?: string;
  } & ISbResponse["data"]["story"]["content"];
}

export default function Footer({ blok }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const mainHeadline = blok.headline[0];
  const ctaButton = blok.link[0];
  const subFooter = blok.sub_footer[0];

  return (
    <footer className="w-full bg-gray-50">
      <div className="container mx-auto px-6 py-16 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-auto">
            <Link href="/" className="font-bold text-2xl">
              <Logo className="w-[82px] h-[87px]" />
              <span className="sr-only">Home</span>
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-start max-w-[559px]">
            {mainHeadline && (
              <h2 className="text-2xl text-black md:text-3xl font-bold mb-8 text-center md:text-left">
                {mainHeadline.content}
              </h2>
            )}

            {ctaButton && (
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-full">
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                </div>
                <Button
                  asChild
                  className="rounded-full bg-black text-white hover:bg-gray-800"
                >
                  <Link href={ctaButton.link.cached_url || "#"}>
                    {ctaButton.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © {currentYear} {subFooter.name}
              </p>
            </div>

            <nav className="flex space-x-6">
              {subFooter.links.map((item: LinkItem) => (
                <Link
                  key={item._uid}
                  href={item.link.cached_url || "#"}
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
