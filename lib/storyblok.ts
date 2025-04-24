import { CaseStudyIntro } from "@/components/case-study-intro";
import HeadlineBlok from "@/components/headline-blok";
import { Hero } from "@/components/hero";
import { ImageAtom } from "@/components/image";
import { MarqueeProjects } from "@/components/marquee_projects";
import PageTemplate from "@/components/pageTemplate";
import { ProjectCard } from "@/components/project-card";
import Quote from "@/components/quote";
import { Text } from "@/components/text";
import TextImageGrid from "@/components/text-image-grid";
import { TextImage } from "@/components/text_image";
import { TextMultiImage } from "@/components/text_multi_image";

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
    hero: Hero,
    marquee_projects: MarqueeProjects,
    project: ProjectCard,
    headline: HeadlineBlok,
    text_component: Text,
    image_component: ImageAtom,
    case_study_intro: CaseStudyIntro,
    text_image: TextImage,
    text_multi_image: TextMultiImage,
    text_image_grid: TextImageGrid,
    quote: Quote,
    homepage_template: PageTemplate,
    page_template: PageTemplate,
  },
});

export function getStoryblokApi() {
  return getStoryblokApiOriginal();
}
