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
 * @property {string[]} [tags]
 * @property {string} [updated]
 */

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
