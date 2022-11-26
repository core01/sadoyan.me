import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';

import { IPost, IPostMeta, IPostsGroupedByYear } from './model/interfaces/IPost';

const POSTS_DIRECTORY = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(POSTS_DIRECTORY);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(POSTS_DIRECTORY, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data as IPostMeta, content };
}

export function getAllPosts(): IPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (new Date(post1.meta.publishedAt) > new Date(post2.meta.publishedAt) ? -1 : 1));
  return posts;
}

export function getAllPostsGroupedByYear() {
  return getAllPosts().reduce<IPostsGroupedByYear>((a, e) => {
    const year = new Date(e.meta.publishedAt).getFullYear();
    if (!a.hasOwnProperty(year)) {
      a[year] = [];
    }
    a[year].push(e);

    return a;
  }, {});
}

export default async function markdownToHtml(markdown: any) {
  const result = await remark()
    .use(remarkHtml, { sanitize: false })
    // @ts-ignore
    .use(remarkPrism, {
      languages: ['javascript', 'css', 'html', 'jsx', 'tsx'],
      plugins: ['line-numbers'],
    })
    .process(markdown);

  return result.toString();
}
