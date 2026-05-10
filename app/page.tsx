import { getBlogPostList } from '@/lib/helpers/file-helpers';
import Stitch from '@/components/Stitch/Stitch';
import Heading from '@/components/Heading/Heading';
import PostList from '@/components/PostList/PostList';

export default async function Home() {
  const posts = await getBlogPostList();

  return (
    <>
      <Heading
        level={1}
        color="text-highlight-3"
        size="text-3xl sm:text-5xl"
        margin="mb-4"
        className="text-center leading-[1.4]"
      >
        Daniel W. Robert
      </Heading>
      <p className="italic mb-4 text-center text-highlight-1 text-xl sm:text-2xl">
        Front-End Engineer. Always a student.
      </p>
      <Stitch />
      <PostList posts={posts} />
    </>
  );
}
