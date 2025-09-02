import { PostCard } from '../../Post/ui/PostCard';
import * as S from './PostList.styles';
import { ReactNode } from 'react';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

interface PostProps {
  posts: Post[];
  children?: ReactNode;
}

export const PostList = ({ posts, children }: PostProps) => {
  return (
    <S.List>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </S.List>
  );
};
