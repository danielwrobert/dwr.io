import type { Metadata } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getCategoryList, getPostsByCategory } from '@/lib/helpers/file-helpers';
import Stitch from '@/components/Stitch/Stitch';
import Button from '@/components/Button/Button';

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
      <h1 className="entry-title text-highlight-3">In: {label}</h1>
      <Stitch />
      {posts.map((post) => (
        <article className="note" key={post.slug}>
          <h2>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </h2>
          <h5 className="italic mb-2.5">
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </h5>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </article>
      ))}
      <Button href="/">&larr; All notes</Button>
    </>
  );
}
