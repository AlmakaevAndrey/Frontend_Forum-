import { useAddCommentMutation, useGetCommentsQuery } from '../../api/apiSlice';
import { useState } from 'react';
import { useToast } from '../../shared/lib/toast';
import * as S from './Comment.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../api/store';
import { useTranslation } from 'react-i18next';
import { count } from 'console';

type Props = { postId: string };

const CommentsDiv: React.FC<Props> = ({ postId }) => {
  const { t } = useTranslation();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: comments = [], isLoading } = useGetCommentsQuery(postId);
  const [addComment, { isLoading: adding }] = useAddCommentMutation();
  const [text, setText] = useState('');
  const { showInfo, showError } = useToast();

  const handleAddComment = async () => {
    if (!token) {
      showError(t('comments.guestsCannotComment'));
      return;
    }

    if (!text.trim()) return;
    try {
      const result = await addComment({ id: postId, text }).unwrap();
      setText('');
      showInfo(t('comments.commentAdded'));
    } catch (error) {
      showError(
        error?.data?.message ||
          error?.error?.data?.message ||
          t('comments.commentAddError')
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>
        {t('comments.commentsCount', { count: comments.length })}
      </S.CommentsTitle>

      <S.CommentsList>
        {comments.map((c, idx) => (
          <S.CommentWrapper key={`${c.userId}-${c.createdAt ?? idx}`}>
            <S.CommentHeader>
              <S.Username>{c.username} </S.Username>
              <S.DateText>
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
              </S.DateText>
            </S.CommentHeader>
            <S.CommentText>{c.text} </S.CommentText>
          </S.CommentWrapper>
        ))}
      </S.CommentsList>

      <S.AddCommentWrapper>
        <S.AddCommentInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('comments.writeComment')}
        />
        <S.AddCommentButton onClick={handleAddComment} disabled={adding}>
          {adding ? t('comments.sending') : t('comments.add')}
        </S.AddCommentButton>
      </S.AddCommentWrapper>
    </S.CommentsWrapper>
  );
};

export default CommentsDiv;
