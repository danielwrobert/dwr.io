import { getBlogPostList } from '@/lib/helpers/file-helpers';
import Logo from '@/components/Logo/Logo';
import Nav from '@/components/Nav/Nav';

export default async function Header() {
  const posts = await getBlogPostList();

  return (
    <header className="flex flex-row items-center justify-between bg-shadow shadow-[0_0.3125rem_0.625rem_0_rgba(0,0,0,0.15)] p-6">
      <Logo />
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
