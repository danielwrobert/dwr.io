import type { Metadata } from 'next';
import { getCategoryList, getPostsByCategory } from '@/lib/helpers/file-helpers';
import Stitch from '@/components/Stitch';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import PostList from '@/components/PostList';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategoryList();
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategoryList();
  const match = categories.find((c) => c.slug === category);
  const label = match?.category ?? category;
  return {
    title: `In: ${label}`,
    description: `Notes in the "${label}" category`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = await getCategoryList();
  const match = categories.find((c) => c.slug === category);
  const label = match?.category ?? category;
  const posts = await getPostsByCategory(category);

  return (
    <>
      <Heading level={1} color="text-highlight-3" className="text-center">In: {label}</Heading>
      <Stitch />
      <PostList posts={posts} />
      <Button href="/">&larr; All notes</Button>
    </>
  );
}
