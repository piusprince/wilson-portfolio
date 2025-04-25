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

  let storyblokVersion;
  switch (true) {
    case isDraftMode:
      storyblokVersion = StoryblokVersion.DRAFT;
      break;
    case isProduction:
      storyblokVersion = StoryblokVersion.PUBLISHED;
      break;
    default:
      storyblokVersion = StoryblokVersion.DRAFT;
      break;
  }

  const headerData = await fetchHeader({
    version: storyblokVersion,
  });

  const footerData = await fetchFooter({
    version: storyblokVersion,
  });

  try {
    let storyData = await fetchStory({
      slug: `cdn/stories/${fullSlug}`,
      params: {
        version: storyblokVersion,
      },
    });

    if (
      storyData.story?.content?.component === "homepage_template" ||
      storyData.story?.content?.component === "page_template"
    ) {
      storyData = preprocessStory(storyData);
    }

    const story = storyData.story;

    console.log("Story data:", { storyData });

    if (!story) {
      return notFound();
    }

    return (
      <>
        {headerData && <Navigation blok={headerData.story.content} />}
        {story.content && (
          <main
            className="relative min-h-screen mx-auto"
            {...storyblokEditable(story.content)}
          >
            <StoryblokServerComponent blok={story.content} />
          </main>
        )}
        {footerData && <Footer blok={footerData.story.content} />}
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

    const title = story.content.page_title ?? story.name ?? "Storyblok Page";
    const description =
      story.content.page_description ?? story.content?.description ?? "";
    const ogImage = story.content.og_image?.filename ?? "/og-image.jpg";

    return {
      title,
      description,
      metadataBase: new URL("https://wilsonaddo.com/website"),
      openGraph: {
        title,
        description,
        url: `https://wilsonaddo.com/website/${fullSlug}`,
        siteName: "Wilson Oware Addo",
        images: [
          {
            url: `/website/${ogImage}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@wilsonaddo",
        images: [`/website/${ogImage}`],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Page",
      description: "An error occurred while fetching the page.",
    };
  }
}
