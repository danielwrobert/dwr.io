import Link from 'next/link';

const sharedClass =
  'bg-highlight-2 !text-background rounded-sm block font-bold mt-14 mx-auto py-2.5 px-4 w-fit transition-opacity duration-500';

type ButtonProps =
  | { href: string; onClick?: never; disabled?: never; children: React.ReactNode }
  | { href?: never; onClick: () => void; disabled?: boolean; children: React.ReactNode };

export default function Button({ href, onClick, disabled, children }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`${sharedClass} opacity-80 hover:opacity-100`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sharedClass} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-80 hover:opacity-100 cursor-pointer'}`}
    >
      {children}
    </button>
  );
}
