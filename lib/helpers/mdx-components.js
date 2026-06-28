import React from 'react';
import CodeSnippet from '@/components/CodeSnippet';
import VideoEmbed from '@/components/VideoEmbed';
import Heading from '@/components/Heading';

const makeHeading = (level) => {
  const HeadingComponent = (props) => React.createElement(Heading, { level, ...props });
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
};

const COMPONENT_MAP = {
  pre: CodeSnippet,
  VideoEmbed,
  h1: makeHeading(1),
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
  h5: makeHeading(5),
  h6: makeHeading(6),
};
export default COMPONENT_MAP;
