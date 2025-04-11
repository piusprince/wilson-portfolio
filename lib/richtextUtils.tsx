import { StoryblokRichTextOptions } from "@storyblok/richtext";
import React from "react";

export const options: StoryblokRichTextOptions<React.ReactElement> = {
  renderFn: React.createElement,
  keyedResolvers: true,
};
