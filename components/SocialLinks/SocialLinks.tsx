import { Twitter, GitHub, Rss } from 'react-feather';

export default function SocialLinks() {
  return (
    <div className="flex mt-6 sm:mt-0">
      <a
        href="https://twitter.com/danielwrobert"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 mr-8 inline-flex"
        aria-label="Twitter"
      >
        <Twitter className="w-[3.2rem] h-[3.2rem]" />
      </a>
      <a
        href="https://github.com/danielwrobert"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 mr-8 inline-flex"
        aria-label="GitHub"
      >
        <GitHub className="w-[3.2rem] h-[3.2rem]" />
      </a>
      <a
        href="/rss.xml"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 inline-flex"
        aria-label="RSS Feed"
      >
        <Rss className="w-[3.2rem] h-[3.2rem]" />
      </a>
    </div>
  );
}
