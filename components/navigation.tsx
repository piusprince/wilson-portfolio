"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

type NavigationProps = Readonly<{
  blok: {
    _uid: string;
    logo: string;
    links: LinkItem[];
    component: string;
    _editable?: string;
  } & ISbResponse["data"]["story"]["content"];
}>;

export default function Navigation({ blok }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full max-w-[1283px] container mx-auto py-[22px] px-[26px]  flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold">
          {blok.logo ? (
            <Logo className="w-10 h-10 text-gray-700" />
          ) : (
            <span className="text-gray-700">Logo</span>
          )}
          <span className="sr-only">Home</span>
        </Link>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button className="rounded-full text-white p-2.5" size="icon">
            <Menu className="w-8 h-8 text-white bg-black" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4 mt-8">
            {blok.links.map((item: LinkItem) => (
              <Link
                key={item._uid}
                href={getStoryblokLinkUrl(item.link)}
                target={item.link.target ?? "_self"}
                className="text-lg font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <nav className="items-center hidden space-x-8 md:flex">
        {blok.links.map((item: LinkItem) => (
          <Link
            key={item._uid}
            href={getStoryblokLinkUrl(item.link)}
            target={item.link.target ?? "_self"}
            className="text-sm font-medium hover:underline"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
