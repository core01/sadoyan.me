import MainLayout from '@/layouts/MainLayout';
import { IPost, IPostsGroupedByYear } from '@/model/interfaces/IPost';
import { getAllPostsGroupedByYear } from '@/utils';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PhotoImage from '../public/photo.jpg';

interface IProps {
  posts: IPostsGroupedByYear;
}

const Home: NextPage<IProps> = ({ posts }) => {
  return (
    <MainLayout>
      <Head>
        <title>Roman Sadoyan</title>
      </Head>
      <main className="leading-loose">
        <div className="mb-4">
          <div className="flex justify-center">
            <Image src={PhotoImage} alt="Roman Sadoyan" className="rounded-full" />
          </div>
          <h3 className="font-semibold text-xl">About me</h3>
          <div className="ml-5">
            <p>
              Graduated from{' '}
              <Link href="http://en.ifmo.ru/en/" className="no-underline" target="_blank" rel="noopener noreferrer">
                ITMO University
              </Link>{' '}
              as master of Computer Science
            </p>
            <p>
              Frontend-developer at{' '}
              <Link href="https://www.oncoshot.com/" className="no-underline" target="_blank" rel="noopener noreferrer">
                Oncoshot.com
              </Link>
            </p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xl">Skills</h3>
          <ul className="ml-5">
            <li>JavaScript, TypeScript, Node.js, Dart</li>
            <li>React, Vue, Flutter</li>
            <li>Git, Webpack, Docker</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-4">Blog</h3>
          {Object.entries(posts).map(([year, posts]) => (
            <div key={year} className="mb-4 pb-4 ml-5 border-b border-red-600 last:border-none">
              <h4 className="text-lg font-semibold">{year}</h4>
              <div className="ml-5">
                {posts.map((post: IPost) => (
                  <div key={post.slug}>
                    <Link href={`/articles/${post.slug}`}>{post.meta.title}</Link> / {post.meta.publishedAt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const posts = getAllPostsGroupedByYear();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
