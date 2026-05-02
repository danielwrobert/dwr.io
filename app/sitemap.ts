import type { MetadataRoute } from "next";
import { getBlogPostList } from "@/lib/helpers/file-helpers";

const SITE_URL = "https://dwr.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPostList();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...postEntries,
  ];
}
