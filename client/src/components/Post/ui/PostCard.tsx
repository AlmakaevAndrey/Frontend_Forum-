import { useState } from 'react';
import * as S from './PostCard.styles';
import { Post } from '../types';

interface PostProps {
  post: Post;
}

export const PostCard = ({ post }: PostProps) => {
  const [likes, setLikes] = useState(post.likes);

  const handleLikes = () => {
    setLikes((prev) => prev + 1);
  };
  return (
    <S.Card>
      <S.Title>{post.title}</S.Title>
      <S.Excerpt>{post.excerpt}</S.Excerpt>
      <S.Footer>
        <span>🪪{post.author}</span>
        <span>📅{post.date}</span>
        {/* Сделать через редакс лайки в глобальном сторедже */}
        <span onClick={handleLikes}>🩷 {likes}</span>
      </S.Footer>
    </S.Card>
  );
};
