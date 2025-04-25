"use server";

import { cookies } from "next/headers";

export async function setVisitedCookie() {
  (await cookies()).set("has_visited", "true", {
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
}
