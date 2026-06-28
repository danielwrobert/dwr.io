import Link from 'next/link';

import { BLOG_TITLE } from '@/lib/constants';

export default function Logo() {
  return (
    <div className="font-serif text-2xl ml-[15px]">
      <Link
        href="/"
        className="text-shadow-light hover:text-highlight-2 transition-colors duration-500"
      >
        {BLOG_TITLE}
      </Link>
    </div>
  );
}
