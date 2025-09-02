import styled from 'styled-components';

export const ContentWrapper = styled.div`
  height: 100%;
  max-width: 1440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  // align-items: center;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SettingsForArticle = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};
`;

export const ContainerForArticle = styled.div`
  height: 40vh;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};
`;

export const ContainerForLinks = styled.div`
  height: 10vh;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};
`;
