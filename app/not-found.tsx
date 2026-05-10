import Link from "next/link";
import Heading from "@/components/Heading/Heading";

export default function NotFound() {
  return (
    <>
      <Heading level={1} color="text-highlight-3" className="entry-title">404</Heading>
      <p className="text-center">
        Page not found.{" "}
        <Link href="/">Return home &rarr;</Link>
      </p>
    </>
  );
}
