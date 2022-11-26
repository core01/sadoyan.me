import PostLayout from '@/layouts/PostLayout';
import { IPostMeta } from '@/model/interfaces/IPost';
import markdownToHtml, { getAllPosts, getPostBySlug } from '@/utils';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface IProps {
  meta: IPostMeta;
  content: string;
}

export default function Post({ meta, content }: IProps) {
  return <PostLayout meta={meta}>{content}</PostLayout>;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const post = getPostBySlug((context.params as ParsedUrlQuery).slug as string);

  const content = await markdownToHtml(post.content);

  return {
    props: {
      ...post,
      content,
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
