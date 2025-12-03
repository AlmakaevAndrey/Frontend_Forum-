import styled from 'styled-components';

export const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 160px auto;
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 20px;
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
  font-size: 30px;
  display: flex;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 760px) {
    font-size: 24px;
  }

  @media (max-width: 580px) {
    font-size: 20px;
  }
`;

export const Author = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 780px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Content = styled.div`
  font-size: 18px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
  word-break: break-word;

  @media (max-width: 760px) {
    font-size: 18px;
  }

  @media (max-width: 580px) {
    font-size: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
