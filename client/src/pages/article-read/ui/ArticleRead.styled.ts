import styled from 'styled-components';

export const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 160px auto;
`;

export const ArticleDiv = styled.article`
  max-width: 800px
  background: ${({ theme }) => theme.colors.primary};
  margin: 40px auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Author = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

export const Content = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
  word-break: break-word;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
