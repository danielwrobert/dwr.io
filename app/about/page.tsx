import type { Metadata } from 'next';
import Stitch from '@/components/Stitch/Stitch';

export const metadata: Metadata = {
  title: 'About — Daniel W. Robert',
  description: 'About my Digital Notebook.',
};

export default function About() {
  return (
    <>
      <h1 className="entry-title text-highlight-3">About My Notebook</h1>
      <Stitch />
      <div className="bg-shadow rounded-sm px-5 py-4">
        <h2>Welcome!</h2>
        <p>
          This site is meant to serve as a Digital Notebook, of sorts. The content you will find
          here is made up of my notes and learnings— whether they be from a course I&apos;ve taken,
          a book or article I&apos;ve read, or something interesting I&apos;ve discovered in
          experimenting.
        </p>
        <p>
          Writing things out, in my own words, allows me to solidify my understanding of what I am
          learning. It also serves as a nice reference to look back on when trying to recall
          something (as opposed to trying to search around for &ldquo;that one article I read on a
          particular topic once&rdquo;).
        </p>
        <p>
          Hopefully, some of my notes here will be helpful for you in your learning journey as well!
        </p>
        <p>
          Instead of getting hung up on producing perfectly curated articles, I may often post some
          of my notes/thoughts and circle back to them later, if necessary.
        </p>
        <p>
          While maybe not <em>exactly</em> the same thing, this isn&apos;t too far off from the
          whole <a href="https://joelhooks.com/digital-garden">&ldquo;Digital Garden&rdquo;</a>{' '}
          idea:
        </p>
        <blockquote>
          &ldquo;It is a blog, sure, but it is also a wiki. It&apos;s a spot where I can post ideas,
          snippets, resources, thoughts, collections, and other bits and pieces that I find
          interesting and useful. Instead of always being a &lsquo;performance&rsquo; level of
          blogging, it can be a looser more human endeavor that drops the idea of robots sorting the
          content (in this case simply by date created) and embraces the idea of curation, by me,
          for you.&rdquo;
        </blockquote>

        <h2>Under The Hood</h2>
        <p>
          This site is built with <a href="https://nextjs.org/">Next.js</a> and hosted on{' '}
          <a href="https://www.netlify.com/">Netlify</a>.
        </p>
        <p>
          The posts are written in <a href="https://mdxjs.com/">Markdown (MDX)</a>.
        </p>

        <h3>Colors</h3>
        <p>
          I&apos;ve styled this site to use the colors from the{' '}
          <a href="https://draculatheme.com/">Dracula</a> color scheme. I&apos;m using that scheme
          in just about all of my apps (VS Code, Vim, iTerm 2, Bear, MacDown, etc.) and I love it!
        </p>

        <h3>Fonts</h3>
        <p>
          This site uses <a href="https://fonts.google.com/specimen/Mulish">Mulish</a> for the body
          font and <a href="https://fonts.google.com/specimen/Ovo">Ovo</a> for the headings, loaded
          via <code>next/font/google</code>.
        </p>
      </div>
    </>
  );
}
