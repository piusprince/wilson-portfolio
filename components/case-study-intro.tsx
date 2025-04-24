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

  console.log({ headlineBlok });

  return (
    <section
      {...storyblokEditable(blok)}
      className="max-w-[1280px] mx-auto mb-[52px] pl-4 pr-6 lg:px-0"
    >
      <div className="max-w-[693px]">
        {headlineBlok && (
          <Headline
            className="text-black"
            level={headlineBlok.level}
            content={headlineBlok.content}
          />
        )}

        {blok.case_study_text && (
          <Text blok={textComponentBlok} className="mb-8" />
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 lg:gap-10 text-sm">
          {blok.case_study_year && (
            <div className="mb-4 sm:mb-0">
              <p className="mb-1 font-medium text-gray-500">Year</p>
              <p>{blok.case_study_year}</p>
            </div>
          )}
          {blok.case_study_industry && (
            <div className="mb-4 sm:mb-0">
              <p className="mb-1 font-medium text-gray-500">Industry</p>
              <p>{blok.case_study_industry}</p>
            </div>
          )}
          {blok.case_study_role && (
            <div className="mb-4 sm:mb-0">
              <p className="mb-1 font-medium text-gray-500">Role</p>
              <p>{blok.case_study_role}</p>
            </div>
          )}
          {blok.case_study_tools && blok.case_study_tools.length > 0 && (
            <div>
              <p className="mb-1 font-medium text-gray-500">Tools</p>
              <p>
                {Array.isArray(blok.case_study_tools)
                  ? blok.case_study_tools.join(", ")
                  : blok.case_study_tools}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
