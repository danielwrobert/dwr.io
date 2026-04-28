import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="entry-title text-highlight-3">404</h1>
      <p className="text-center">
        Page not found.{" "}
        <Link href="/">Return home &rarr;</Link>
      </p>
    </>
  );
}
