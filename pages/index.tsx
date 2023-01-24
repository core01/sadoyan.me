import MainLayout from '@/layouts/MainLayout';
import { IPost, IPostsGroupedByYear } from '@/model/interfaces/IPost';
import { generateRssFeed, getAllPostsGroupedByYear } from '@/utils';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PhotoImage from '../public/photo.jpg';

interface IProps {
  posts: IPostsGroupedByYear;
  notionPosts: any;
}

const Home: NextPage<IProps> = ({ posts, notionPosts }) => {
  return (
    <MainLayout>
      <Head>
        <title>Roman Sadoyan</title>
      </Head>
      <main className="leading-loose md:text-lg">
        <div className="mb-4">
          <div className="flex justify-center">
            <Image
              src={PhotoImage}
              alt="Roman Sadoyan"
              className="rounded-full"
            />
          </div>
          <h3 className="font-semibold text-xl">About me</h3>
          <div className="ml-5">
            <p className="mb-5">
              Hi 👋 there! My name is Roman and I am a frontend developer with
              over {new Date().getFullYear() - 2017} years of experience in the
              field. In addition to my frontend skills, I also have 3 years of
              experience in backend development, which has allowed me to have a
              holistic understanding of the web development process.{' '}
            </p>
            <p className="mb-5">
              In my current role at{' '}
              <Link
                href="https://www.oncoshot.com/"
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oncoshot.com
              </Link>
              , I am responsible for designing and implementing the frontend of
              web applications using the latest technologies and best practices.
              I am constantly seeking ways to improve my skills and stay
              up-to-date with the latest developments in the field.
            </p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xl">Skills</h3>
          <p className="ml-5">
            JavaScript, TypeScript, React, Vue, Node.js, Flutter
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-4">Blog</h3>
          {Object.entries(posts).map(([year, posts]) => (
            <div
              key={year}
              className="mb-4 pb-4 ml-5 border-b border-red-600 last:border-none"
            >
              <h4 className="font-semibold">{year}</h4>
              <div className="ml-5">
                {posts.map((post: IPost) => (
                  <div key={post.slug}>
                    <Link href={`/articles/${post.slug}`}>
                      {post.meta.title}
                    </Link>{' '}
                    / {post.meta.publishedAt}
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

export async function getStaticProps() {
  const posts = getAllPostsGroupedByYear();
  await generateRssFeed();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
