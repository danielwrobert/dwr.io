import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="bg-highlight-2 !text-background rounded-[0.4rem] block font-bold mt-[5.5rem] mx-auto opacity-80 py-4 px-6 w-fit transition-opacity duration-500 hover:opacity-100"
    >
      {children}
    </Link>
  );
}
