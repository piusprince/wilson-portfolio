import { ISbResponseData } from "storyblok-js-client";
import { processHomepageTemplate } from "./homepageTemplateManger";

/**
 * Updates the story structure for page_template components
 * Moves specific sections like hero_section to the body array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processPageTemplate = (story: any): any => {
  if (!story || !story.content || story.content.component !== "page_template") {
    return story;
  }

  const processedStory = JSON.parse(JSON.stringify(story));
  const content = processedStory.content;

  if (!content.body) {
    content.body = [];
  }

  if (content.hero_section && content.hero_section.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heroItemsToAdd = content.hero_section.filter((heroItem: any) => {
      return !content.body.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (bodyItem: any) => bodyItem._uid === heroItem._uid
      );
    });

    content.body = [...heroItemsToAdd, ...content.body];

    content._processed_hero = true;
  }

  return processedStory;
};

/**
 * Processes the story data before rendering
 * This is useful for transforming the structure for specific component types
 */

export const preprocessStory = (
  storyData: ISbResponseData
): ISbResponseData => {
  if (!storyData || !storyData.story) {
    return storyData;
  }

  const story = storyData.story;

  if (story.content?.component === "homepage_template") {
    return {
      ...storyData,
      story: processHomepageTemplate(story),
    };
  }

  if (story.content?.component === "page_template") {
    return {
      ...storyData,
      story: processPageTemplate(story),
    };
  }

  return storyData;
};
