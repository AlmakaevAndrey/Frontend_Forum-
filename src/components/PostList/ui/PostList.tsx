import { PostCard } from '../../Post/ui/PostCard';
import * as S from './PostList.styles';
import { ReactNode, useState } from 'react';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
};

interface PostProps {
  posts: Post[];
  children?: ReactNode;
}

export const PostList = ({ posts }: PostProps) => {
  return (
    <S.List>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </S.List>
  );
};
