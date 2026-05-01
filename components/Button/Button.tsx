import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="bg-highlight-2 !text-background rounded-sm block font-bold mt-14 mx-auto opacity-80 py-2.5 px-4 w-fit transition-opacity duration-500 hover:opacity-100"
    >
      {children}
    </Link>
  );
}
