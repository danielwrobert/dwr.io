import type { Metadata } from 'next';
import Link from "next/link";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: '404 Not Found',
};

export default function NotFound() {
  return (
    <>
      <Heading level={1} color="text-highlight-3" className="text-center">404</Heading>
      <p className="text-center">
        Page not found.{" "}
        <Link href="/">Return home &rarr;</Link>
      </p>
    </>
  );
}
