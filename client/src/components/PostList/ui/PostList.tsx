import { useNavigate } from 'react-router-dom';
import { Post } from '../../../components/Post/types';
import { PostCard } from '../../Post/ui/PostCard';
import * as S from './PostList.styles';
import { ReactNode, useState } from 'react';

interface PostProps {
  posts: Post[];
  children?: ReactNode;
}

export const PostList = ({ posts }: PostProps) => {
  const navigate = useNavigate();
  return (
    <S.List>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onClick={() => navigate(`/article_read/${post._id}`)}
        />
      ))}
    </S.List>
  );
};
