import { Project } from "@/components/project-card";

interface ContentItem {
  _uid: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface HomepageContent {
  component: string;
  hero?: ContentItem[];
  body: ContentItem[];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Story {
  content: HomepageContent;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processHomepageTemplate = (story: Story | any) => {
  if (
    !story ||
    !story.content ||
    story.content.component !== "homepage_template"
  ) {
    return story;
  }

  const content = story.content;

  if (!content.body || !Array.isArray(content.body)) {
    content.body = [];
  }

  const sectionsToAdd = [];

  // Process hero section if it exists
  if (content.hero && content.hero.length > 0) {
    const heroSection = {
      _uid: content.hero[0]._uid,
      component: "hero",
      ...content.hero[0],
    };
    sectionsToAdd.push(heroSection);
    content.hero = [];
  }

  // Process marquee section if it exists
  if (content.marquee && content.marquee.length > 0) {
    const marqueeSection = {
      _uid: content.marquee[0]._uid,
      component: "marquee_projects",
      ...content.marquee[0].marquee_project,
    };
    sectionsToAdd.push(marqueeSection);
    content.marquee = [];
  }

  // Process highlight section if it exists
  if (content.highlight_projects && content.highlight_projects.length > 0) {
    const highlightSections = content.highlight_projects.map(
      (project: Project) => ({
        ...project,
      })
    );
    sectionsToAdd.push(...highlightSections);
    content.highlight_projects = [];
  }

  content.body = [...sectionsToAdd, ...content.body];

  return story;
};
