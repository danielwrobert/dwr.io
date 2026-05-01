import { getBlogPostList } from "@/lib/helpers/file-helpers";
import Nav from "@/components/Nav/Nav";

export default async function Header() {
  const posts = await getBlogPostList();

  return (
    <header className="bg-shadow shadow-[0_0.3125rem_0.625rem_0_rgba(0,0,0,0.15)] p-6">
      <Nav
        posts={posts.map(({ slug, title, excerpt, tags }) => ({
          slug,
          title,
          excerpt,
          tags,
        }))}
      />
    </header>
  );
}
