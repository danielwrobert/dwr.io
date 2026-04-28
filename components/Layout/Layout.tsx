export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[79rem] mx-auto px-10 py-28 w-full">
      {children}
    </div>
  );
}
