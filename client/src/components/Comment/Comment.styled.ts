import styled from 'styled-components';

export const CommentsWrapper = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundSecond};
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

export const CommentsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

export const CommentWrapper = styled.li`
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  word-break: break-word;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const Username = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const DateText = styled.span`
  font-size: 12px;
  color: gray;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const AddCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AddCommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundInput};
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
`;

export const AddCommentButton = styled.button`
  align-self: flex-end;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textBlack};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
