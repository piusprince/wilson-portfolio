import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   // Check for secret token
//   const secret = searchParams.get("secret");
//   if (secret !== process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN) {
//     return new Response("Invalid token", { status: 401 });
//   }

//   // Check Storyblok validation parameters
//   const spaceId = searchParams.get("_storyblok_tk[space_id]");
//   const timestamp = searchParams.get("_storyblok_tk[timestamp]");
//   const token = searchParams.get("_storyblok_tk[token]");

//   if (!spaceId || !timestamp || !token) {
//     return new Response("Missing Storyblok validation parameters", {
//       status: 400,
//     });
//   }

//   // Validate the timestamp (e.g., ensure it's within the last hour)
//   const validationTimestamp = parseInt(timestamp, 10);
//   if (
//     isNaN(validationTimestamp) ||
//     Date.now() / 1000 - validationTimestamp > 3600
//   ) {
//     return new Response("Invalid timestamp", { status: 401 });
//   }

//   // Validate the token using Storyblok API (optional but recommended)
//   // This requires your preview token to be available server-side
//   // const api = getStoryblokApi(); // Ensure getStoryblokApi works server-side
//   // const validationString = `${spaceId}:${process.env.STORYBLOK_PREVIEW_TOKEN}:${timestamp}`;
//   // const generatedToken = crypto.createHash('sha1').update(validationString).digest('hex');
//   // if (token !== generatedToken) {
//   //   return new Response("Invalid Storyblok token", { status: 401 });
//   // }

//   // Get the slug to redirect to
//   const slug = searchParams.get("slug");
//   if (!slug) {
//     return new Response("Missing slug parameter", { status: 400 });
//   }

//   // Enable Draft Mode by setting the cookie
//   (await draftMode()).enable();

//   // Redirect to the path from the fetched post
//   // We don't redirect to searchParams.get("slug") as that might lead to open redirect vulnerabilities
//   redirect(`/${slug}`);
// }

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // searchParams.set("_storyblok", "true");
  (await draftMode()).enable();
  redirect(`/${slug}?${searchParams.toString()}`);
};
