import { useState } from 'react';
import * as S from './PostCard.styles';
import { Post } from '../types';
import { useLikePostMutation } from '../../../api/apiSlice';

interface PostProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard = ({ post, onClick }: PostProps) => {
  const [likePost] = useLikePostMutation();

  const handleLikes = () => {
    likePost(post._id);
  };

  return (
    <S.Card onClick={onClick}>
      <S.Title>{post.title}</S.Title>
      <S.Excerpt>{post.excerpt}</S.Excerpt>
      <S.Footer>
        <S.SpanItem>
          {post.authorAvatar ? (
            <img src={post.authorAvatar} alt={post.author} />
          ) : (
            '👨‍💻'
          )}
          {/* Доделать логику аватара, после того ка сделаю добавление аватара и создание статьи */}
          {post.author}
        </S.SpanItem>
        <S.SpanItem>
          📅
          {new Date(post.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </S.SpanItem>
        <S.SpanItem onClick={handleLikes}>
          🩷 {post.likes?.length ?? 0}
        </S.SpanItem>
      </S.Footer>
    </S.Card>
  );
};
