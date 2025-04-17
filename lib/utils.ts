import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type StoryblokLink = {
  id: string;
  url: string;
  target?: string;
  linktype: "story" | "url" | "email" | string;
  fieldtype: "multilink";
  cached_url?: string;
  email?: string;
};

export function getStoryblokLinkUrl(link: StoryblokLink): string {
  if (!link) return "#";

  switch (link.linktype) {
    case "story":
      return `/${link.cached_url}`;
    case "url":
      return link.url;
    case "email":
      return `mailto:${link.email}`;
    default:
      return "#";
  }
}
