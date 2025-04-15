import { StoryblokVersion } from "./fetchHeader";
import { fetchStory } from "./fetchStory";

export async function fetchFooter({
  version = StoryblokVersion.DRAFT,
}: {
  version?: StoryblokVersion;
}) {
  try {
    const footerData = await fetchStory({
      slug: "cdn/stories/configs/footer",
      params: {
        version: version,
      },
    });

    return footerData;
  } catch (error) {
    console.error("Failed to fetch footer:", error);
    return null;
  }
}
