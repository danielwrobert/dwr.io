'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import NoteCard from '@/components/NoteCard/NoteCard';
import Heading from '@/components/Heading/Heading';
import Button from '@/components/Button/Button';

const PAGE_SIZE = 5;

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      {visiblePosts.map((post) => (
        <NoteCard key={post.slug}>
          <Heading level={2}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </Heading>
          <Heading level={5} className="italic mb-2.5">
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </Heading>
          <p>{post.excerpt}</p>
          <Link href={`/${post.slug}`}>Read note &rarr;</Link>
        </NoteCard>
      ))}
      <Button
        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
        disabled={!hasMore}
      >
        {hasMore ? 'Load more' : 'All caught up'}
      </Button>
    </>
  );
}
