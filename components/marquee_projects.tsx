import { Marquee } from "@/components/magicui/marquee";
import { LinkProps } from "./hero";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

export type ImageProps = {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: string;
  meta_data: Record<string, unknown>;
  is_external_url: boolean;
};

type MarqueeProject = {
  _uid: string;
  link: Array<LinkProps>;
  component: string;
  project_image: ImageProps;
  _editable?: string;
};

type MarqueeProjectsProps = {
  blok: {
    _uid: string;
    component: string;
    [key: string]: MarqueeProject | string;
  };
};

export const MarqueeProjects = ({ blok }: MarqueeProjectsProps) => {
  const projects = Object.entries(blok)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([, value]) => value as MarqueeProject);

  return (
    <div {...storyblokEditable(blok)} className="w-full overflow-hidden py-28">
      <Marquee className="py-4" pauseOnHover>
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <a
              key={project._uid}
              href={project.link[0]?.link.url}
              className="mx-4 block"
            >
              <Image
                src={project.project_image.filename}
                alt={project.project_image.alt || "Project Image"}
                width={485}
                height={336}
                className="h-auto w-auto object-cover rounded-lg"
              />
            </a>
          ))}
      </Marquee>
    </div>
  );
};
