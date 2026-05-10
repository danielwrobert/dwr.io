import clsx from 'clsx';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  size?: string;
  color?: string;
  margin?: string;
}

const sizeClass: Record<HeadingLevel, string> = {
  1: 'text-2xl sm:text-[2.5rem]',
  2: 'text-2xl sm:text-3xl',
  3: 'text-xl sm:text-2xl',
  4: 'text-lg',
  5: 'text-base',
  6: 'text-base',
};

const colorClass: Record<HeadingLevel, string> = {
  1: 'text-highlight-5',
  2: 'text-highlight-5',
  3: 'text-highlight-5',
  4: 'text-shadow-light',
  5: 'text-shadow-light',
  6: 'text-shadow-light',
};

export default function Heading({
  level,
  size = sizeClass[level],
  color = colorClass[level],
  margin = 'mb-2.5',
  style,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag className={clsx('font-serif', margin, size, color, className)} style={style} {...props}>
      {children}
    </Tag>
  );
}
