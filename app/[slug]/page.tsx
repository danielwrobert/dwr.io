import type { Metadata } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPostList, loadBlogPost, slugify } from '@/lib/helpers/file-helpers';
import COMPONENT_MAP from '@/lib/helpers/mdx-components';
import Stitch from '@/components/Stitch/Stitch';
import Button from '@/components/Button/Button';
import Heading from '@/components/Heading/Heading';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPostList();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await loadBlogPost(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated,
    },
    twitter: {
      card: 'summary',
      title: frontmatter.title,
      description: frontmatter.excerpt,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { frontmatter, content } = await loadBlogPost(slug);

  const { title, date, updated, category, tags } = frontmatter;
  const dateLabel = updated
    ? `Updated on ${format(parseISO(updated), 'MM/dd/yyyy')}`
    : `Published on ${format(parseISO(date), 'MM/dd/yyyy')}`;
  const dateClass = updated ? 'entry-meta-updated' : 'entry-meta';

  return (
    <>
      <Heading level={1} color="text-highlight-3" className="entry-title">{title}</Heading>
      <p className={dateClass}>{dateLabel}</p>
      <Stitch />
      <div className="bg-shadow rounded-sm mb-12 px-5 py-4">
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
      <Stitch />
      {category && (
        <p>
          Category:{' '}
          <Link href={`/category/${slugify(category)}`} className="text-highlight-1">
            {category}
          </Link>
        </p>
      )}
      {tags && tags.length > 0 && (
        <p>
          Tags:{' '}
          {tags.map((tag: string, i: number) => (
            <span key={tag}>
              <Link href={`/tags/${slugify(tag)}`} className="text-highlight-1">
                {tag}
              </Link>
              {i < tags.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}
      <hr className="mt-12 mb-6 opacity-50" />
      <Button href="/">&larr; Back to all notes</Button>
    </>
  );
}
