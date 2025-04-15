import { preprocessStory } from "@/lib/pageTemplateManager";
import { fetchStory } from "../_actions/fetchStory";
import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { fetchHeader, StoryblokVersion } from "../_actions/fetchHeader";
import Navigation from "@/components/navigation";
import { fetchFooter } from "../_actions/fetchFooter";
import Footer from "@/components/footer";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function CatchAllPage({ params }: Props) {
  const fullSlug = (await params).slug ? (await params).slug.join("/") : "home";
  const isProduction = process.env.NODE_ENV === "production";
  const isDraftMode = (await draftMode()).isEnabled;
  const headerData = await fetchHeader({
    version: isDraftMode
      ? StoryblokVersion.DRAFT
      : isProduction
      ? StoryblokVersion.PUBLISHED
      : StoryblokVersion.DRAFT,
  });
  const footerData = await fetchFooter({
    version: isDraftMode
      ? StoryblokVersion.DRAFT
      : isProduction
      ? StoryblokVersion.PUBLISHED
      : StoryblokVersion.DRAFT,
  });

  try {
    let storyData = await fetchStory({
      slug: `cdn/stories/${fullSlug}`,
      params: {
        version: isDraftMode ? "draft" : isProduction ? "published" : "draft",
      },
    });

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
      <>
        {headerData && fullSlug !== "configs/header" && (
          <Navigation blok={headerData.story.content} />
        )}
        <main
          className="container mx-auto"
          {...storyblokEditable(story.content)}
        >
          <StoryblokServerComponent blok={story.content} />
        </main>
        {footerData && fullSlug !== "configs/footer" && (
          <Footer blok={footerData.story.content} />
        )}
      </>
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
        version: isProduction ? "published" : "draft",
      },
    });

    const story = storyData.story;

    if (!story) {
      return {};
    }

    return {
      title: story.name || "Storyblok Page",
      description: story.content?.description ?? "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Page",
      description: "An error occurred while fetching the page.",
    };
  }
}
