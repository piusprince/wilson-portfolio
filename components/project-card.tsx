"use client";

import { cn } from "@/lib/utils";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import React from "react";

import Link from "next/link";

export type ProjectLink = {
  _uid: string;
  link: {
    id: string;
    url: string;
    linktype: "story" | "url";
    fieldtype: "multilink";
    cached_url: string;
  };
  name: string;
  variant: "primary" | "secondary" | "button_primary" | "button_secondary";
  component: "link";
  _editable?: string;
};

export type ProjectImage = {
  _uid: string;
  image: {
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    source: string;
    filename: string;
    copyright: string;
    fieldtype: "asset";
    meta_data: Record<string, unknown>;
    is_external_url: boolean;
  };
  component: "project_image";
  main_image: boolean;
  _editable?: string;
};

export type ProjectVideo = {
  _uid: string;
  video: {
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    source: string;
    filename: string;
    copyright: string;
    fieldtype: "asset";
    meta_data: Record<string, unknown>;
    is_external_url: boolean;
  };
  component: string;
  main_image: boolean;
  _editable?: string;
};

export type Project = {
  _uid: string;
  role: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  team: any;
  skills: string[];
  component: "project";
  project_link: ProjectLink[];
  project_name: string;
  project_year: string;
  project_logo: ProjectImage[];
  project_images: ProjectImage[];
  project_video: ProjectVideo[];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  project_summary: any;
  background_color: string;
  project_category: string;
  project_description: string;
  _editable?: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
};

export interface ProjectProps {
  blok: Project;
}

export const ProjectCard = ({ blok }: ProjectProps) => {
  const {
    project_name,
    project_link,
    // project_year,
    project_logo,
    project_images,
    project_video,
    project_category,
    project_description,
    role,
    skills,
    background_color,
  } = blok;

  const additionalImages = project_images.slice(0, 5);
  const mainVideo = project_video?.[0];

  const allMedia = mainVideo
    ? [mainVideo, ...additionalImages]
    : [...additionalImages];

  return (
    <section
      {...storyblokEditable(blok)}
      className={`rounded-lg px-5 overflow-hidden w-full text-white items-center mb-[90px]`}
    >
      <Link href={project_link[0]?.link.cached_url ?? "#"} className="block">
        <div
          className="w-full mb-6 rounded-lg"
          style={{
            backgroundColor: background_color || "#121212",
            color: "white",
          }}
        >
          <div className="px-10 pt-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                {project_logo?.[0]?.image && (
                  <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-md bg-white/10">
                    <Image
                      src={project_logo[0].image.filename || "/placeholder.svg"}
                      alt={project_logo[0].image.alt || project_name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="text-xl font-medium text-white">
                  {project_name}
                </h2>
              </div>
              <p className="text-white underline font-bricolage">
                {project_link[0]?.name || "View Project"}
              </p>
            </div>

            {project_category && (
              <p className="text-lg mb-4 font-normal text-[#666666]">
                {project_category}
              </p>
            )}

            {project_description && (
              <p className="text-2xl font-normal max-w-[741px] mb-11 md:mb-[70px] lg:mb-0">
                {project_description}
              </p>
            )}
          </div>

          {allMedia && allMedia.length > 0 && (
            <div className="px-10 pb-[66px] lg:mb-0 lg:py-10">
              <div className="flex gap-5 overflow-x-auto image-gallery touch-pan-x">
                {allMedia.map((media, index) => (
                  <div
                    key={media._uid}
                    className={cn(
                      "rounded-lg overflow-hidden transition-all duration-300 ease-in-out",
                      index === 0
                        ? "h-[425px] w-[452px] gallery-item-active"
                        : "h-[427px] w-[197.2px] gallery-item"
                    )}
                  >
                    {media.component === "video_component" ? (
                      <video
                        src={media.video.filename}
                        autoPlay
                        loop
                        muted
                        className="object-cover w-full h-full"
                        poster={media.video.filename}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={
                          "image" in media
                            ? media.image.filename ?? "/placeholder.svg"
                            : "/placeholder.svg"
                        }
                        alt={
                          "image" in media
                            ? media.image.alt ??
                              `${project_name} screenshot ${index + 1}`
                            : `${project_name} screenshot ${index + 1}`
                        }
                        width={index === 0 ? 452 : 197.2}
                        height={index === 0 ? 425 : 427}
                        className="object-cover w-full h-full"
                        draggable={false}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="text-black bg-white">
        <div className="grid grid-cols-1 gap-6 lg:gap-[103px] lg:grid-cols-[871px_274.25px]">
          <div className="space-y-6">
            {role && (
              <div>
                <h3 className="mb-2 text-sm font-medium">Role</h3>
                <p className="text-sm">{role}</p>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-medium">Skills</h3>
                <ul className="space-y-1">
                  {skills.map((skill) => (
                    <li
                      key={`skill-${skill}`}
                      className="flex items-center gap-1 text-sm"
                    >
                      <span className="text-xs">+</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
