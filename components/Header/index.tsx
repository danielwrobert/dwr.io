import { getBlogPostList } from '@/lib/helpers/file-helpers';
import Logo from '@/components/Logo';
import Nav from '@/components/Nav';
import ColorThemeToggle from '@/components/ColorThemeToggle';

export default async function Header({ initialTheme }: { initialTheme: 'light' | 'dark' }) {
  const posts = await getBlogPostList();

  return (
    <header className="flex flex-row items-center justify-between bg-shadow p-6">
      <Logo />
      <div className="flex items-center gap-2">
        <Nav
          posts={posts.map(({ slug, title, excerpt, tags }) => ({
            slug,
            title,
            excerpt,
            tags,
          }))}
        />
        <ColorThemeToggle initialTheme={initialTheme} />
      </div>
    </header>
  );
}
