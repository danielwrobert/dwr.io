import type { Metadata } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getTagList, getPostsByTag } from '@/lib/helpers/file-helpers';
import Stitch from '@/components/Stitch/Stitch';
import Button from '@/components/Button/Button';
import Heading from '@/components/Heading/Heading';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = await getTagList();
  return tags.map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tags = await getTagList();
  const match = tags.find((t) => t.slug === tag);
  const label = match?.tag ?? tag;
  return {
    title: `Tagged: ${label}`,
    description: `Notes tagged with "${label}"`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tags = await getTagList();
  const match = tags.find((t) => t.slug === tag);
  const label = match?.tag ?? tag;
  const posts = await getPostsByTag(tag);

  return (
    <>
      <Heading level={1} color="text-highlight-3" className="entry-title">Tagged: {label}</Heading>
      <Stitch />
      {posts.map((post) => (
        <article className="note" key={post.slug}>
          <Heading level={2}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </Heading>
          <Heading level={5} className="italic mb-2.5">
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </Heading>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </article>
      ))}
      <Button href="/">&larr; All notes</Button>
    </>
  );
}
