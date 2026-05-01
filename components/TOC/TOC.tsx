export default function TOC({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-shadow rounded-sm p-4 my-[1.125rem]">
      <h2 className="!text-highlight-4">Series Table of Contents:</h2>
      {children}
    </div>
  );
}
