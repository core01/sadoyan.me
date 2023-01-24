import { IPostMeta } from '@/model/interfaces/IPost';
import { markdownToHtml, getAllPosts, getPostBySlug } from '@/utils';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/Post.module.css';
import { Share } from '@/components/Share';
import readingTime, { ReadTimeResults } from 'reading-time';
import { Footer } from '@/components/Footer';
import { createHmac } from 'crypto';

interface IProps {
  meta: IPostMeta;
  content: string;
  readingTime: ReadTimeResults;
  slug: string;
  token: string;
}

export default function Post({
  meta,
  content,
  readingTime,
  token,
  slug,
}: IProps) {
  const { asPath } = useRouter();

  const postUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${asPath}`;

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="w-full fixed bg-white flex items-center z-10 py-4">
          <Link href="/">
            <FontAwesomeIcon icon={faAngleLeft} /> Back to home
          </Link>
        </div>
        <div className="py-4">
          <div className="flex flex-col max-w-4xl my-10 mx-auto text-gray-700">
            <Head>
              <title>{meta.title}</title>
              <meta
                property="og:image"
                key="og:image"
                content={`/api/og?data=${encodeURIComponent(
                  `title=${meta.title}&token=${token}&slug=${slug}`
                )}`}
              />
            </Head>

            <div className="border-b-gray-100 border-b pb-5">
              <h1 className="text-3xl mb-4">{meta.title}</h1>
              <div className="flex justify-between items-center text-md">
                <div>Published at {meta.publishedAt}</div>
                <div>{readingTime.text}</div>
              </div>
            </div>
            <div
              className={styles.Content}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="flex justify-center sm:justify-end">
              <Share url={postUrl} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params as IParams;

  const hmac = createHmac('sha256', 'my_secret');
  hmac.update(JSON.stringify({ slug }));
  const token = hmac.digest('hex');

  const post = getPostBySlug(slug);

  const content = await markdownToHtml(post.content);

  return {
    props: {
      ...post,
      content,
      readingTime: readingTime(post.content),
      token,
      slug,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}