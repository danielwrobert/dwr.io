import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getBlogPostList } from "@/lib/helpers/file-helpers";
import Stitch from "@/components/Stitch/Stitch";
import Heading from "@/components/Heading/Heading";

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <>
      <Heading level={1} color="text-highlight-3" className="entry-title">Daniel W. Robert</Heading>
      <Heading level={3} color="text-highlight-1" className="italic mb-4 text-center">
        Front-End Engineer. Always a student.
      </Heading>
      <Stitch />
      {posts.map((post) => (
        <article className="note" key={post.slug}>
          <Heading level={2}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </Heading>
          <Heading level={5} className="italic mb-2.5">
            {format(parseISO(post.date), "MMMM d, yyyy")}
          </Heading>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </article>
      ))}
    </>
  );
}
