import { ISbStoriesParams } from "@storyblok/react";
import { ISbResponseData } from "storyblok-js-client";

import { getStoryblokApi } from "@/lib/storyblok";

export async function fetchStory({
  slug,
  params = {},
}: {
  slug: string;
  params?: ISbStoriesParams;
}): Promise<ISbResponseData> {
  const api = getStoryblokApi();

  if (!api) {
    throw new Error("Storyblok API client is not available");
  }

  console.log({ slug, params });

  const fullSlug = slug.startsWith("cdn/stories")
    ? slug
    : `cdn/stories/${slug}`;

  const response = await api.get(fullSlug, params, {
    cache: "no-store",
  });
  return response.data;
}
