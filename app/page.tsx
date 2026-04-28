import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getBlogPostList } from "@/lib/helpers/file-helpers";
import Stitch from "@/components/Stitch/Stitch";
import Button from "@/components/Button/Button";

export default async function Home() {
  const posts = await getBlogPostList();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <h1 className="entry-title text-highlight-3">Daniel W. Robert</h1>
      <h3 className="text-highlight-1 italic mb-6 text-center">
        Front-End Engineer. Always a student.
      </h3>
      <Stitch />
      <p>Hello and welcome to my Digital Notebook!</p>
      <p>
        I&apos;m a Front-End Engineer at{" "}
        <a href="https://automattic.com">Automattic</a> – the company behind
        WordPress.com, Jetpack, WooCommerce, Tumblr, Gravatar, and a bunch of
        other cool products that you may have seen around the web.
      </p>
      <h2 className="mb-[1.8rem]">Latest Notes:</h2>
      {latestPosts.map((post) => (
        <article className="note" key={post.slug}>
          <h3>
            <Link href={`/${post.slug}`} className="text-highlight-1">
              {post.title}
            </Link>
          </h3>
          <h5 className="italic mb-4">
            {format(parseISO(post.date), "MM/dd/yyyy")}
          </h5>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </article>
      ))}
      <Button href="/notebook">View all notes</Button>
    </>
  );
}
