"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-row items-center list-none m-0 p-0">
        <li className="font-serif text-[2.5rem] ml-[15px] mr-auto">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            DWR
          </Link>
        </li>
        <li className="mx-[15px]">
          <Link
            href="/notebook"
            className={pathname?.startsWith('/notebook') ? 'active' : ''}
          >
            Notebook
          </Link>
        </li>
        <li className="mx-[15px]">
          <Link
            href="/about"
            className={pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
