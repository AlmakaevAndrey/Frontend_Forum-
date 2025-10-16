import { useAddCommentMutation, useGetCommentsQuery } from '../../api/apiSlice';
import { useState } from 'react';
import { useToast } from '../../shared/lib/toast';
import * as S from './Comment.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../api/store';

type Props = { postId: string };

const CommentsDiv: React.FC<Props> = ({ postId }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: comments = [], isLoading } = useGetCommentsQuery(postId);
  const [addComment, { isLoading: adding }] = useAddCommentMutation();
  const [text, setText] = useState('');
  const { showInfo, showError } = useToast();

  const handleAddComment = async () => {
    if (!token) {
      showError(
        'Гости не могут оставлять комментарии. Пожалуйста, войдите в систему.'
      );
      return;
    }

    if (!text.trim()) return;
    try {
      console.log('Adding comment:', { id: postId, text });
      const result = await addComment({ id: postId, text }).unwrap();
      console.log('Comment added:', result);
      setText('');
      showInfo('Комментарий добавлен!!');
    } catch (error) {
      console.error('Add comment error:', error);
      showError(
        error?.data?.message ||
          error?.error?.data?.message ||
          'Ошибка при добавлении комментария'
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Комментарии ({comments.length})</S.CommentsTitle>

      <S.CommentsList>
        {comments.map((c, idx) => (
          <S.CommentWrapper key={`${c.userId}-${c.createdAt ?? idx}`}>
            <S.CommentHeader>
              <S.Username>{c.username}</S.Username>
              <S.DateText>
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
              </S.DateText>
            </S.CommentHeader>
            <S.CommentText>{c.text}</S.CommentText>
          </S.CommentWrapper>
        ))}
      </S.CommentsList>

      <S.AddCommentWrapper>
        <S.AddCommentInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Написать комментарий...'
        />
        <S.AddCommentButton onClick={handleAddComment} disabled={adding}>
          {adding ? 'Отправка...' : 'Добавить'}
        </S.AddCommentButton>
      </S.AddCommentWrapper>
    </S.CommentsWrapper>
  );
};

export default CommentsDiv;
