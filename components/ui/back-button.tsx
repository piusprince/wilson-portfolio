"use client";

import { BackArrow } from "./icons";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="px-4 py-2 text-sm bg-white/80 font-bricolage hover:bg-white rounded-[30px] shadow-sm"
    >
      <span className="flex items-center gap-2">
        <BackArrow className="inline-block" />
        Back
      </span>
    </button>
  );
}
