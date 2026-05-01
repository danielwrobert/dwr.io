import { Twitter, GitHub, Rss } from 'react-feather';

export default function SocialLinks() {
  return (
    <div className="flex mt-4 sm:mt-0">
      <a
        href="https://twitter.com/danielwrobert"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 mr-5 inline-flex"
        aria-label="Twitter"
      >
        <Twitter className="w-8 h-8" />
      </a>
      <a
        href="https://github.com/danielwrobert"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 mr-5 inline-flex"
        aria-label="GitHub"
      >
        <GitHub className="w-8 h-8" />
      </a>
      <a
        href="/rss.xml"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 inline-flex"
        aria-label="RSS Feed"
      >
        <Rss className="w-8 h-8" />
      </a>
    </div>
  );
}
