import { memo } from 'react';
import * as S from './PostCard.styles';
import { Post } from '../types';
import { useLikePostMutation } from '../../../api/apiSlice';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { formatText } from '../../../utils/formatText';

interface PostProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard = memo(({ post, onClick }: PostProps) => {
  const [likePost] = useLikePostMutation();
  const { t, i18n } = useTranslation();
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://frontend-forum.onrender.com'
      : 'http://localhost:5000';

  const handleLikes = () => {
    likePost(post._id);
  };

  const dateFormatted = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.date));

  return (
    <S.Card onClick={onClick}>
      <S.Title>{post.title}</S.Title>
      <S.Excerpt
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(formatText(post.excerpt)),
        }}
      />
      <S.Footer>
        <S.SpanItem data-testid='span-item'>
          {post.authorAvatar && post.authorAvatar.trim() !== '' ? (
            <img
              src={`${API_URL}${encodeURI(post.authorAvatar)}`}
              alt={post.author}
              style={{ width: 30, height: 30, borderRadius: '50%' }}
            />
          ) : (
            <S.Span>👨‍💻 </S.Span>
          )}
          {post.author}
        </S.SpanItem>
        <S.SpanItem data-testid='span-item'>
          <S.Span>📅 </S.Span>
          {dateFormatted}
        </S.SpanItem>
        <S.SpanItem
          onClick={handleLikes}
          data-testid={`like-button-${post._id}`}
        >
          <S.Span>🩷 </S.Span>
          {post.likes?.length ?? 0}
        </S.SpanItem>
      </S.Footer>
    </S.Card>
  );
});
