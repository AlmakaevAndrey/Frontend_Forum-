import * as S from './PostCard.styles';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
};

interface PostProps {
  post: Post;
}

export const PostCard = ({ post }: PostProps) => {
  return (
    <S.Card>
      <S.Title>{post.title}</S.Title>
      <S.Excerpt>{post.excerpt}</S.Excerpt>
      <S.Footer>
        <span>🪪{post.author}</span>
        <span>📅{post.date}</span>
        <span>🩷 {post.likes}</span>
      </S.Footer>
    </S.Card>
  );
};
