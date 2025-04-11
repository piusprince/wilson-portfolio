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

  try {
    const fullSlug = slug.startsWith("cdn/stories")
      ? slug
      : `cdn/stories/${slug}`;

    const response = await api.get(fullSlug, params, {
      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    });

    if (!response?.data) {
      throw new Error("No data received from Storyblok");
    }

    return response.data;
  } catch (error) {
    console.error("Storyblok API Error:", error);
    throw error;
  }
}
