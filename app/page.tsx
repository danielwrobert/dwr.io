import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getBlogPostList } from "@/lib/helpers/file-helpers";
import Stitch from "@/components/Stitch/Stitch";

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <>
      <h1 className="entry-title text-highlight-3">Daniel W. Robert</h1>
      <h3 className="text-highlight-1 italic mb-4 text-center">
        Front-End Engineer. Always a student.
      </h3>
      <Stitch />
      {posts.map((post) => (
        <article className="note" key={post.slug}>
          <h2>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </h2>
          <h5 className="italic mb-2.5">
            {format(parseISO(post.date), "MMMM d, yyyy")}
          </h5>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </article>
      ))}
    </>
  );
}
