"use client";

import { cn } from "@/lib/utils";
import {
  convertAttributesInElement,
  richTextResolver,
  storyblokEditable,
} from "@storyblok/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import React from "react";
import { options } from "@/lib/richtextUtils";

export interface ProjectLink {
  _uid: string;
  link: {
    id: string;
    url: string;
    linktype: "story" | "url";
    fieldtype: "multilink";
    cached_url: string;
  };
  name: string;
  variant: "button_primary" | string;
  component: "link";
  _editable?: string;
}

export interface ProjectImage {
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
}

export interface ProjectSummary {
  type: "doc";
  content: Array<{
    type: "paragraph";
    content: Array<{
      text: string;
      type: "text";
      marks: Array<{
        type: "textStyle";
        attrs: {
          color: string;
        };
      }>;
    }>;
  }>;
}

export interface Project {
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
}

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

  return (
    <div
      {...storyblokEditable(blok)}
      className={`rounded-lg container mx-auto overflow-hidden w-full text-white items-center mb-[90px]`}
    >
      <div
        className="w-full mb-6 rounded-lg"
        style={{
          backgroundColor: background_color || "#121212",
          color: "white",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              {mainImage && (
                <div className="w-8 h-8 rounded-md overflow-hidden bg-white/10 flex items-center justify-center">
                  <Image
                    src={mainImage.image.filename || "/placeholder.svg"}
                    alt={mainImage.image.alt || project_name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-medium">{project_name}</h2>
            </div>
            <span className="text-sm opacity-80">{project_year}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category, index) => (
              <span key={index} className="text-sm opacity-70">
                {category}
                {index < categories.length - 1 && ", "}
              </span>
            ))}
          </div>

          <p className="text-lg font-medium mb-6">{project_description}</p>
        </div>

        <div className="px-6 pb-6 ">
          <div className="flex gap-2 overflow-x-auto image-gallery">
            {allImages.map((img, index) => (
              <div
                key={img._uid}
                className={cn(
                  "h-[400px] rounded-lg overflow-hidden transition-all duration-300 ease-in-out",
                  img.main_image ? "gallery-item-active" : "gallery-item"
                )}
              >
                <Image
                  src={img.image.filename || "/placeholder.svg"}
                  alt={
                    img.image.alt || `${project_name} screenshot ${index + 1}`
                  }
                  width={452}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="px-6 grid grid-cols-1 lg:grid-cols-[871px_274.25px] gap-[103px]">
          <div>
            <div className="flex justify-between items-center mb-2">
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
                <Button
                  variant="outline"
                  className="rounded-full bg-black text-white border-white/20 hover:bg-white/10"
                  asChild
                >
                  <a
                    href={primaryLink.link.url}
                    className="flex items-center gap-2"
                  >
                    {primaryLink.name}
                    <ChevronRight size={16} />
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Role</h3>
              <p className="text-sm">{role}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Skills</h3>
              <ul className="space-y-1">
                {skills.map((skill, index) => (
                  <li key={index} className="text-sm flex items-center gap-1">
                    <span className="text-xs">+</span> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Team</h3>
              {team && formattedTeamMembers}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
