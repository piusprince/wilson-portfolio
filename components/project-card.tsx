"use client";

import { cn, getStoryblokLinkUrl } from "@/lib/utils";
import {
  convertAttributesInElement,
  richTextResolver,
  storyblokEditable,
} from "@storyblok/react";
import Image from "next/image";
import { Button } from "./ui/button";
import React from "react";
import { options } from "@/lib/richtextUtils";

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
  project_images: ProjectImage[];
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
    project_year,
    project_images,
    project_summary,
    project_category,
    project_description,
    role,
    skills,
    team,
    background_color,
  } = blok;

  const mainImage = project_images.find((img) => img.main_image);

  const additionalImages = project_images
    .filter((img) => !img.main_image)
    .slice(0, 5);

  const primaryLink = project_link.find(
    (link) => link.variant === "button_primary"
  );

  const categories = project_category
    .split(",")
    .map((cat) => cat.trim())
    .filter(Boolean);

  const [summaryExpanded, setSummaryExpanded] = React.useState(false);

  const allImages = mainImage
    ? [mainImage, ...additionalImages]
    : [...additionalImages];

  const projectSummaryHtml = project_summary
    ? richTextResolver(options).render(project_summary)
    : "";

  const teamMembersHtml = team ? richTextResolver(options).render(team) : "";

  const formattedProjectSummary = projectSummaryHtml
    ? convertAttributesInElement(projectSummaryHtml)
    : "";

  const formattedTeamMembers = teamMembersHtml
    ? convertAttributesInElement(teamMembersHtml)
    : "";

  const linkUrl = primaryLink ? getStoryblokLinkUrl(primaryLink.link) : "#";

  return (
    <section
      {...storyblokEditable(blok)}
      className={`rounded-lg px-5 overflow-hidden w-full text-white items-center mb-[90px]`}
    >
      <div
        className="w-full mb-6 rounded-lg"
        style={{
          backgroundColor: background_color || "#121212",
          color: "white",
        }}
      >
        <div className="px-10 pt-10">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              {mainImage && (
                <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-md bg-white/10">
                  <Image
                    src={mainImage.image.filename || "/placeholder.svg"}
                    alt={mainImage.image.alt || project_name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-medium text-white">{project_name}</h2>
            </div>
            <span className="text-sm opacity-80">{project_year}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.length > 0 &&
              categories.map((category) => (
                <span
                  key={`category-${category}`}
                  className="text-sm opacity-70"
                >
                  {category}
                </span>
              ))}
          </div>

          {project_description && (
            <p className="text-lg font-medium max-w-[741px] mb-11 md:mb-[70px] lg:mb-0">
              {project_description}
            </p>
          )}
        </div>

        {allImages.length > 0 && (
          <div className="px-10 pb-[66px] lg:mb-0 lg:py-10">
            <div className="flex gap-2 overflow-x-auto image-gallery touch-pan-x">
              {allImages.map((img, index) => (
                <div
                  key={img._uid}
                  className={cn(
                    "rounded-lg overflow-hidden transition-all duration-300 ease-in-out",
                    img.main_image
                      ? "h-[425px] w-[452px] gallery-item-active"
                      : "h-[427px] w-[197.2px] gallery-item"
                  )}
                >
                  <Image
                    src={img.image.filename || "/placeholder.svg"}
                    alt={
                      img.image.alt || `${project_name} screenshot ${index + 1}`
                    }
                    width={img.main_image ? 452 : 197.2}
                    height={img.main_image ? 425 : 427}
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-black bg-white">
        <div className="px-6 grid grid-cols-1 lg:grid-cols-[871px_274.25px]">
          {formattedProjectSummary && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Summary</h3>
                <button
                  onClick={() => setSummaryExpanded(!summaryExpanded)}
                  className="text-sm opacity-70 hover:opacity-100"
                >
                  {summaryExpanded ? "Hide" : "Show"}
                </button>
              </div>

              <div
                className={cn(
                  "transition-all text-base mb-4 duration-300",
                  summaryExpanded
                    ? "max-h-96 opacity-100"
                    : "max-h-24 opacity-100 line-clamp-3"
                )}
              >
                {formattedProjectSummary}
              </div>

              {primaryLink && (
                <div className="mt-4">
                  <Button variant={primaryLink.variant} asChild>
                    <a href={linkUrl} className="flex items-center gap-2">
                      {primaryLink.name}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

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

            {formattedTeamMembers && (
              <div>
                <h3 className="mb-2 text-sm font-medium">Team</h3>
                {formattedTeamMembers}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
