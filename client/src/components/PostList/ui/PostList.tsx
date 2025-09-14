import { Post } from '../../../components/Post/types';
import { PostCard } from '../../Post/ui/PostCard';
import * as S from './PostList.styles';
import { ReactNode, useState } from 'react';

interface PostProps {
  posts: Post[];
  children?: ReactNode;
}

export const PostList = ({ posts }: PostProps) => {
  return (
    <S.List>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </S.List>
  );
};
