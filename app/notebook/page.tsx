import type { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getBlogPostList } from "@/lib/helpers/file-helpers";
import Stitch from "@/components/Stitch/Stitch";

export const metadata: Metadata = {
  title: "Notebook — Daniel W. Robert",
  description: "My open collection of notes, resources, and explorations.",
};

export default async function Notebook() {
  const posts = await getBlogPostList();

  return (
    <>
      <h1 className="entry-title text-highlight-3">Notebook</h1>
      <Stitch />
      <p>
        My open collection of notes, resources, and explorations I&apos;m
        currently working on. This is a place for me to post ideas, snippets,
        resources, course notes, etc.
      </p>
      {posts.map((post) => (
        <article className="note" key={post.slug}>
          <h2>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </h2>
          <h5 className="italic mb-4">
            {format(parseISO(post.date), "MM/dd/yyyy")}
          </h5>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </article>
      ))}
    </>
  );
}
