export interface IPostMeta {
  title: string;
  author: string;
  publishedAt: string;
  tags: string;
  description: string;
}
export interface IPost {
  slug: string;
  meta: IPostMeta;
}

export interface IPostsGroupedByYear {
  [key: number]: IPost[];
}
