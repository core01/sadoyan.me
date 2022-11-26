import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { useRouter } from 'next/router';
import styles from './PostLayout.module.css';
import classnames from 'classnames';

import { Share } from '@/components/Share';
interface IProps {
  meta: {
    title: string;
    publishedAt: string;
  };
}

export default function PostLayout({ children, meta }: PropsWithChildren<IProps>) {
  const createPostContent = () => ({ __html: children as string });
  const { asPath } = useRouter();

  const postUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${asPath}`;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div>
        <Link href="/">
          <FontAwesomeIcon icon={faAngleLeft} /> Back to home
        </Link>
      </div>
      <div className="flex flex-col max-w-4xl my-10 mx-auto text-gray-700">
        <Head>
          <title>{meta.title}</title>
        </Head>

        <div className="border-b-gray-100 border-b pb-5">
          <h1 className="text-3xl mb-4">{meta.title}</h1>
          <div className="flex justify-between items-center text-md">
            <h4>Published at {meta.publishedAt}</h4>
            <Share url={postUrl} />
          </div>
        </div>
        <div
          className={classnames(styles.Content, 'prose lg:prose-xl my-4 sm:my-8 text-lg leading-7 grid gap-6')}
          dangerouslySetInnerHTML={createPostContent()}
        />
      </div>
    </div>
  );
}
