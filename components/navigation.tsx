"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

interface NavigationProps {
  blok: {
    _uid: string;
    logo: string;
    links: LinkItem[];
    component: string;
    _editable?: string;
  } & ISbResponse["data"]["story"]["content"];
}

export default function Navigation({ blok }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full max-w-[1440px] container mx-auto py-4  flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="font-bold text-2xl">
          {blok.logo ? (
            <Logo className="w-10 h-10 text-gray-700" />
          ) : (
            <span className="text-gray-700">Logo</span>
          )}
          <span className="sr-only">Home</span>
        </Link>
      </div>

      {/* Mobile menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4 mt-8">
            {blok.links.map((item: LinkItem) => (
              <Link
                key={item._uid}
                href={item.link.cached_url || "#"}
                target={item.link.target || "_self"}
                className="text-lg font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <nav className="hidden md:flex items-center space-x-8">
        {blok.links.map((item: LinkItem) => (
          <Link
            key={item._uid}
            href={item.link.cached_url || "#"}
            target={item.link.target || "_self"}
            className="text-sm font-medium hover:underline"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
