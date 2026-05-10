interface NoteCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function NoteCard({ children, className, ...props }: NoteCardProps) {
  return (
    <article
      className={`bg-shadow rounded p-5 not-last-of-type:mb-12 [&_h2_a]:text-highlight-5 [&_h3_a]:text-highlight-5 ${className ?? ''}`}
      {...props}
    >
      {children}
    </article>
  );
}
