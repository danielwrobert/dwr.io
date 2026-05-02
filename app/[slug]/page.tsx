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
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: "article",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated,
    },
    twitter: {
      card: "summary",
      title: frontmatter.title,
      description: frontmatter.excerpt,
    },
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
	  <div className="bg-shadow rounded-sm px-5 py-4">
		<MDXRemote source={content} components={COMPONENT_MAP} />
	  </div>
      <hr className="mt-12 mb-6 opacity-50" />
      <Button href="/">&larr; Back to all notes</Button>
    </>
  );
}
