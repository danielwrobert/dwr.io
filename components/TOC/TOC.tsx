export default function TOC({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-shadow rounded-[0.5rem] p-6 my-[1.8rem]">
      <h2 className="!text-highlight-4">Series Table of Contents:</h2>
      {children}
    </div>
  );
}
