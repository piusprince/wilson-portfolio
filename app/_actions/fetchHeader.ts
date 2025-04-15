import { fetchStory } from "./fetchStory";

export async function fetchHeader() {
  try {
    const headerData = await fetchStory({
      slug: "cdn/stories/configs/header",
      params: {
        version: "draft",
      },
    });

    return headerData;
  } catch (error) {
    console.error("Failed to fetch header:", error);
    return null;
  }
}
