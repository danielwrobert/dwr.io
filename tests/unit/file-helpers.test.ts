import { describe, it, expect } from "vitest";
import { getBlogPostList } from "@/lib/helpers/file-helpers";

describe("getBlogPostList", () => {
  it("returns at least one post with the expected frontmatter shape", async () => {
    const posts = await getBlogPostList();

    expect(posts.length).toBeGreaterThan(0);

    const post = posts[0];
    expect(post).toHaveProperty("slug");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("date");
    expect(post).toHaveProperty("excerpt");
  });

  it("returns all 27 migrated posts", async () => {
    const posts = await getBlogPostList();
    expect(posts.length).toBe(27);
  });

  it("sorts posts newest-first", async () => {
    const posts = await getBlogPostList();
    for (let i = 0; i < posts.length - 1; i++) {
      expect(new Date(posts[i].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i + 1].date).getTime()
      );
    }
  });
});
