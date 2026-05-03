import type { MetadataRoute } from "next";
import { getBlogPostList, getTagList, getCategoryList } from "@/lib/helpers/file-helpers";

const SITE_URL = "https://dwr.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags, categories] = await Promise.all([
    getBlogPostList(),
    getTagList(),
    getCategoryList(),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map(({ slug }) => ({
    url: `${SITE_URL}/tags/${slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map(({ slug }) => ({
    url: `${SITE_URL}/category/${slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
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
    ...tagEntries,
    ...categoryEntries,
  ];
}
