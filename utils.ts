import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import withShiki from '@stefanprobst/remark-shiki';
import * as shiki from 'shiki';
import { Feed } from 'feed';

import {
  IPost,
  IPostMeta,
  IPostsGroupedByYear,
} from './model/interfaces/IPost';

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
    .sort((post1, post2) =>
      new Date(post1.meta.publishedAt) > new Date(post2.meta.publishedAt)
        ? -1
        : 1
    );
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

export async function markdownToHtml(markdown: any) {
  const highlighter = await shiki.getHighlighter({ theme: 'min-light' });
  const result = await remark()
    .use(remarkHtml, { sanitize: false })
    .use(withShiki, { highlighter })
    .process(markdown);

  return result.toString();
}

export async function generateRssFeed() {
  const allPosts = await getAllPosts();
  const site_url = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const feedOptions = {
    title: 'Roman Sadoyan',
    description: 'Frontend, technologies and something else',
    id: site_url!,
    link: site_url,
    favicon: `${site_url}/apple-touch-icon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Roman Sadoyan`,
    generator: 'Feed for Node.js',
    feedLinks: {
      atom: `${site_url}/rss.xml`,
    },
    author: {
      name: 'Roman Sadoyan',
      email: 'roman@sadoyan.me',
      link: site_url,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.meta.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      // description: post.description,
      date: new Date(post.meta.publishedAt),
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
  fs.writeFileSync('./public/rss.json', feed.json1());
  fs.writeFileSync('./public/atom.xml', feed.atom1());
}
