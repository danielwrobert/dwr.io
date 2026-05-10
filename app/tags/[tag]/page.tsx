import type { Metadata } from 'next';
import { getTagList, getPostsByTag } from '@/lib/helpers/file-helpers';
import Stitch from '@/components/Stitch/Stitch';
import Button from '@/components/Button/Button';
import Heading from '@/components/Heading/Heading';
import PostList from '@/components/PostList/PostList';

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
      <Heading level={1} color="text-highlight-3" className="text-center">Tagged: {label}</Heading>
      <Stitch />
      <PostList posts={posts} />
      <Button href="/">&larr; All notes</Button>
    </>
  );
}
