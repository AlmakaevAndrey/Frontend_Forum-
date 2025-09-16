import styled from 'styled-components';

export const ContentWrapper = styled.div`
  height: 100%;
  max-width: 1440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.backgroundSecond};
  // align-items: center;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const SettingsForArticle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.border};
  }
`;

export const WrapperForArticleDiv = styled.div`
  display: flex;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
`;

export const ContainerForArticle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-radius: 20px;

  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};

  display: flex;
  flex-direction: column;
  gap: 16px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.border};
  }
`;

export const InputInArticle = styled.input`
  width: 600px;
  padding: 10px 14px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  @media (max-width: 835px) {
    width: 300px;
  }

  @media (max-width: 515px) {
    width: 200px;
  }

  input:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
  }

  input::placeholder {
    color: #888;
  }
`;

export const SelectInArticle = styled.select`
  width: 150px;
  padding: 10px 10px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 835px) {
    width: 125px;
  }

  @media (max-width: 835px) {
    font-size: 12px;
    width: 105px;
  }

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
  }

  &:hover {
    border-color: #0070f3;
  }
`;

export const OptionInArticle = styled.option`
  display: flex;
  align-items: center;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const ContainerForLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20px 0;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.border};
  }
`;

export const WrapperGridLinksList = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;

  @media (max-width: 835px) {
    gap: 10px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 2fr);
  }
`;

export const DividerLinksList = styled.div``;

export const LinksList = styled.ul`
  // display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LinkItem = styled.li`
  margin-bottom: 8px;
`;

export const LinkAnchor = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.svg};
  }
`;
