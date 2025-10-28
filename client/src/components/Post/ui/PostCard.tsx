import { memo, useState } from 'react';
import * as S from './PostCard.styles';
import { Post } from '../types';
import { useLikePostMutation } from '../../../api/apiSlice';
import { useTranslation } from 'react-i18next';

interface PostProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard = memo(({ post, onClick }: PostProps) => {
  const [likePost] = useLikePostMutation();
  const { t, i18n } = useTranslation();

  const handleLikes = () => {
    likePost(post._id);
  };

  const dateFormatted = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

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
          {dateFormatted}
        </S.SpanItem>
        <S.SpanItem onClick={handleLikes}>
          🩷 {post.likes?.length ?? 0}
        </S.SpanItem>
      </S.Footer>
    </S.Card>
  );
});
