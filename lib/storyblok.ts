import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { MarqueeProjects } from "@/components/marquee_projects";
import Navigation from "@/components/navigation";
// import Navbar from "@/components/Navbar";
import PageTemplate from "@/components/pageTemplate";
import { ProjectCard } from "@/components/project-card";

import {
  apiPlugin,
  storyblokInit,
  getStoryblokApi as getStoryblokApiOriginal,
} from "@storyblok/react/rsc";

storyblokInit({
  accessToken:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_STORYBLOK_TOKEN
      : process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: {
    // page: Page,
    // navbar: Navbar,
    hero: Hero,
    marquee_projects: MarqueeProjects,
    project: ProjectCard,
    navigation: Navigation,
    footer: Footer,
    // team_overview: Team,
    homepage_template: PageTemplate,
    page_template: PageTemplate,
  },
});

export function getStoryblokApi() {
  return getStoryblokApiOriginal();
}
