import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

interface PageTemplateProps {
  blok: {
    _uid: string;
    body: any[];
    hero_section?: any[];
    contact?: any[];
    [key: string]: any;
  };
}

const PageTemplate = ({ blok }: PageTemplateProps) => {
  // Process the content using our utility function
  // The content is already processed by the time it reaches this component
  return (
    <main {...storyblokEditable(blok)}>
      {/* Render hero section first if it exists */}
      {/* {blok.hero_section?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))} */}

      {/* Render main body content */}
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}

      {/* Render contact section last if it exists */}
      {blok.contact?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default PageTemplate;
