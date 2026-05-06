import { X, GitHub, Rss } from 'react-feather';

export default function SocialLinks() {
  return (
    <div className="flex mt-4 sm:mt-0">
      <a
        href="https://x.com/danielwrobert"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 mr-5 inline-flex"
        aria-label="X"
      >
        <X className="w-6 h-6" />
      </a>
      <a
        href="https://github.com/danielwrobert"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 mr-5 inline-flex"
        aria-label="GitHub"
      >
        <GitHub className="w-6 h-6" />
      </a>
      <a
        href="/rss.xml"
        rel="external"
        className="text-shadow-light hover:text-highlight-3 inline-flex"
        aria-label="RSS Feed"
      >
        <Rss className="w-6 h-6" />
      </a>
    </div>
  );
}
