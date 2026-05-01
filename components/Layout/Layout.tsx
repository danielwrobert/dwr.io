export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[49.375rem] mx-auto px-6 py-18 w-full">
      {children}
    </div>
  );
}
