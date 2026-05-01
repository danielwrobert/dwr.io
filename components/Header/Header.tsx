import { getBlogPostList } from "@/lib/helpers/file-helpers";
import Nav from "@/components/Nav/Nav";
import SearchBox from "@/components/SearchBox/SearchBox";

export default async function Header() {
  const posts = await getBlogPostList();

  return (
    <header className="bg-shadow shadow-[0_0.5rem_1rem_0_rgba(0,0,0,0.15)] p-10">
      <Nav
        searchSlot={
          <SearchBox
            posts={posts.map(({ slug, title, excerpt, tags }) => ({
              slug,
              title,
              excerpt,
              tags,
            }))}
          />
        }
      />
    </header>
  );
}
