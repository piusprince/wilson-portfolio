import { Hero } from "@/components/hero";
import { MarqueeProjects } from "@/components/marquee_projects";
// import Navbar from "@/components/Navbar";
import PageTemplate from "@/components/pageTemplate";
import { ProjectCard } from "@/components/project-card";

import {
  apiPlugin,
  storyblokInit,
  getStoryblokApi as getStoryblokApiOriginal,
} from "@storyblok/react/rsc";

storyblokInit({
  // accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  accessToken:
    process.env.NODE_ENV === "production"
      ? process.env.STORYBLOK_PUBLIC_TOKEN
      : process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    // page: Page,
    // navbar: Navbar,
    hero: Hero,
    marquee_projects: MarqueeProjects,
    project: ProjectCard,
    // team_overview: Team,
    homepage_template: PageTemplate,
    page_template: PageTemplate,
  },
});

export function getStoryblokApi() {
  return getStoryblokApiOriginal();
}
