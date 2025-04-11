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
  const isProduction = process.env.NODE_ENV === "production";

  console.log("Full slug:", { fullSlug });

  try {
    let storyData = await fetchStory({
      slug: `cdn/stories/${fullSlug}`,
      params: {
        version: isProduction ? "published" : "draft",
      },
    });

    // Only preprocess if needed for the specific template type
    if (
      storyData.story?.content?.component === "homepage_template" ||
      storyData.story?.content?.component === "page_template"
    ) {
      storyData = preprocessStory(storyData);
    }

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
    // Consider throwing the error in production for better debugging via Vercel logs
    //@ts-expect-error type error
    if (isProduction && error.status !== 404) {
      throw error;
    }
    return notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const fullSlug = (await params).slug.join("/");
  const isProduction = process.env.NODE_ENV === "production";

  try {
    const storyData = await fetchStory({
      slug: `cdn/stories/${fullSlug}`,
      params: {
        // Use 'published' in production, 'draft' otherwise
        version: isProduction ? "published" : "draft",
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

// export async function generateStaticParams() {
//   // You can add known routes here, like:
//   // return [{ slug: ["shop-de"] }, { slug: [] }];
//   return [];
// }
