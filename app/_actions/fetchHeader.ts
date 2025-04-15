import { fetchStory } from "./fetchStory";

export enum StoryblokVersion {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export async function fetchHeader({
  version = StoryblokVersion.DRAFT,
}: {
  version?: StoryblokVersion;
}) {
  try {
    const headerData = await fetchStory({
      slug: "cdn/stories/configs/header",
      params: {
        version: version,
      },
    });

    return headerData;
  } catch (error) {
    console.error("Failed to fetch header:", error);
    return null;
  }
}
