import { fetchStory } from "./fetchStory";

export async function fetchFooter() {
  try {
    const footerData = await fetchStory({
      slug: "cdn/stories/configs/footer",
      params: {
        version: "draft",
      },
    });

    return footerData;
  } catch (error) {
    console.error("Failed to fetch footer:", error);
    return null;
  }
}
