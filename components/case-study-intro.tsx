import type React from "react";
import Headline from "./headline";
import { Text } from "./text"; // Import the Text component
import { storyblokEditable, ISbStoryData } from "@storyblok/react";

// Define the type for the Storyblok blok data
interface CaseStudyIntroBlok extends ISbStoryData {
  case_study_headline: {
    _uid: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    content: string;
    component: string;
    _editable?: string;
  }[];
  case_study_text: any; // Use 'any' or a more specific RichText type from Storyblok
  case_study_role: string;
  case_study_year: string;
  case_study_industry: string;
  case_study_tools: string[];
  component: "case_study_intro";
  _uid: string;
  _editable?: string;
}

const CaseStudyIntro: React.FC<{ blok: CaseStudyIntroBlok }> = ({ blok }) => {
  // Remove the renderText function as it's no longer needed

  // Extract the first headline block if it exists
  const headlineBlok = blok.case_study_headline?.[0];

  // Prepare a minimal blok object for the Text component
  // Note: We create a derived _uid to avoid potential key conflicts.
  // The Text component itself won't be directly editable here,
  // the parent CaseStudyIntro is.
  const textComponentBlok = {
    _uid: blok._uid + "-text", // Create a unique ID for this instance
    component: "text", // Identify the component type (optional, depends on Text component needs)
    text: blok.case_study_text, // Pass the rich text data
    // No _editable needed here as the Text component instance isn't the primary editable element
  };

  return (
    <div {...storyblokEditable(blok)} className="max-w-3xl mb-[52px] px-4">
      {/* Render headline */}
      {headlineBlok && (
        <Headline level={headlineBlok.level} content={headlineBlok.content} />
      )}
      <Text blok={textComponentBlok} />

      {/* Render metadata */}
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

export default CaseStudyIntro;
