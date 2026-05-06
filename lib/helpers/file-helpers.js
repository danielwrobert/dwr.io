import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

/**
 * @typedef {Object} BlogPost
 * @property {string} slug
 * @property {string} title
 * @property {string} date
 * @property {string} excerpt
 * @property {string} [category]
 * @property {string[]} [tags]
 * @property {string} [updated]
 */

export function slugify(text) {
  return text
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** @returns {Promise<BlogPost[]>} */
export async function getBlogPostList() {
  const yearDirs = await readDirectory('/content');

  const blogPosts = [];

  for (const yearDir of yearDirs) {
    const fileNames = await readDirectory(`/content/${yearDir}`);

    for (const fileName of fileNames) {
      if (!fileName.endsWith('.mdx')) continue;

      const rawContent = await readFile(`/content/${yearDir}/${fileName}`);
      const { data: frontmatter } = matter(rawContent);

      blogPosts.push({
        slug: fileName.replace('.mdx', ''),
        ...frontmatter,
      });
    }
  }

  return blogPosts.sort((p1, p2) =>
    p1.date < p2.date ? 1 : -1
  );
}

export const loadBlogPost = React.cache(
  async function loadBlogPost(slug) {
    const yearDirs = await readDirectory('/content');

    for (const yearDir of yearDirs) {
      try {
        const rawContent = await readFile(`/content/${yearDir}/${slug}.mdx`);
        const { data: frontmatter, content } = matter(rawContent);
        return { frontmatter, content };
      } catch {
        continue;
      }
    }

    throw new Error(`Post not found: ${slug}`);
  }
);

export async function getTagList() {
  const posts = await getBlogPostList();
  const counts = {};
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const slug = slugify(tag);
      if (!counts[slug]) counts[slug] = { tag, slug, count: 0 };
      counts[slug].count++;
    }
  }
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

export async function getCategoryList() {
  const posts = await getBlogPostList();
  const counts = {};
  for (const post of posts) {
    if (!post.category) continue;
    const slug = slugify(post.category);
    if (!counts[slug]) counts[slug] = { category: post.category, slug, count: 0 };
    counts[slug].count++;
  }
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

export async function getPostsByTag(tagSlug) {
  const posts = await getBlogPostList();
  return posts.filter((post) =>
    (post.tags ?? []).some((tag) => slugify(tag) === tagSlug)
  );
}

export async function getPostsByCategory(categorySlug) {
  const posts = await getBlogPostList();
  return posts.filter((post) => post.category && slugify(post.category) === categorySlug);
}

function readFile(localPath) {
  return fs.readFile(
    path.join(process.cwd(), localPath),
    'utf8'
  );
}

function readDirectory(localPath) {
  return fs.readdir(
    path.join(process.cwd(), localPath)
  );
}
