import type React from "react";
import Headline from "./headline";
import { Text } from "./text";
import { storyblokEditable } from "@storyblok/react";

interface CaseStudyIntroBlok {
  blok: {
    case_study_headline: {
      _uid: string;
      level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      content: string;
      component: string;
      _editable?: string;
    }[];
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    case_study_text: any;
    case_study_role: string;
    case_study_year: string;
    case_study_industry: string;
    case_study_tools: string[];
    component: "case_study_intro";
    _uid: string;
    _editable?: string;
  };
}

export const CaseStudyIntro = ({ blok }: CaseStudyIntroBlok) => {
  const headlineBlok = blok.case_study_headline?.[0];

  const textComponentBlok = {
    _uid: blok._uid + "-text",
    component: "text",
    text: blok.case_study_text,
  };

  return (
    <div {...storyblokEditable(blok)} className="max-w-3xl mb-[52px]">
      {headlineBlok && (
        <Headline
          className="text-black"
          level={headlineBlok.level}
          content={headlineBlok.content}
        />
      )}
      <Text blok={textComponentBlok} />

      <div className="grid grid-cols-4 gap-6 text-sm pt-4 mt-8">
        <div>
          <p className="font-medium text-gray-500 mb-1">Year</p>
          <p>{blok.case_study_year}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 mb-1">Industry</p>
          <p>{blok.case_study_industry}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 mb-1">Role</p>
          <p>{blok.case_study_role}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500 mb-1">Tools</p>
          <p>
            {Array.isArray(blok.case_study_tools)
              ? blok.case_study_tools.join(", ")
              : blok.case_study_tools}
          </p>
        </div>
      </div>
    </div>
  );
};
