import { preprocessStory } from "@/lib/pageTemplateManager";
import { fetchStory } from "../_actions/fetchStory";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
// import { preprocessStory } from "@/lib/pageTemplateUtils";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function CatchAllPage({ params }: Props) {
  // Convert the slug to a path string
  const fullSlug = (await params).slug ? (await params).slug.join("/") : "home";

  console.log("Full slug:", { fullSlug });

  try {
    let storyData = await fetchStory({
      slug: `cdn/stories/${fullSlug}`,
      params: {
        version: "draft",
      },
    });

    storyData = preprocessStory(storyData);

    const story = storyData.story;

    if (!story) {
      return notFound();
    }

    return (
      <main {...storyblokEditable(story.content)}>
        <StoryblokServerComponent blok={story.content} />
      </main>
    );
  } catch (error) {
    console.error("Failed to load page:", error);
    return notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const fullSlug = (await params).slug.join("/");

  try {
    const storyData = await fetchStory({
      slug: `cdn/stories/${fullSlug}`,
      params: {
        version: "draft",
      },
    });

    const story = storyData.story;

    if (!story) {
      return {};
    }

    return {
      title: story.name || "Storyblok Page",
      description: story.content?.description || "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Page",
      description: "An error occurred while fetching the page.",
    };
  }
}

export async function generateStaticParams() {
  // You can add known routes here, like:
  // return [{ slug: ["shop-de"] }, { slug: [] }];
  return [];
}
