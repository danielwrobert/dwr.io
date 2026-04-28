import type { Metadata } from "next";
import { format, parseISO } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPostList, loadBlogPost } from "@/lib/helpers/file-helpers";
import COMPONENT_MAP from "@/lib/helpers/mdx-components";
import Stitch from "@/components/Stitch/Stitch";
import Button from "@/components/Button/Button";

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
    title: `${frontmatter.title} — Daniel W. Robert`,
    description: frontmatter.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { frontmatter, content } = await loadBlogPost(slug);

  const { title, date, updated } = frontmatter;
  const dateLabel = updated
    ? `Updated on ${format(parseISO(updated), "MM/dd/yyyy")}`
    : `Published on ${format(parseISO(date), "MM/dd/yyyy")}`;
  const dateClass = updated ? "entry-meta-updated" : "entry-meta";

  return (
    <>
      <h1 className="entry-title text-highlight-3">{title}</h1>
      <p className={dateClass}>{dateLabel}</p>
      <Stitch />
      <MDXRemote source={content} components={COMPONENT_MAP} />
      <hr className="mt-[4.5rem] mb-[2.5rem] opacity-50" />
      <Button href="/notebook">&larr; Back to all notes</Button>
    </>
  );
}
