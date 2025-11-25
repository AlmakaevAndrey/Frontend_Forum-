import styled from 'styled-components';

export const MemeCard = styled.article`
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 760px) {
    padding: 10px;
    gap: 6px;
  }

  @media (max-width: 560px) {
    padding: 6px;
    gap: 4px;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const MemeImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: contain;
  border-radius: 8px;
`;

export const SpanItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: normal;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#007bff'};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 660px) {
    display: flex;
    flex-direction: column;
  }

  span {
    display: flex;
    align-items: center;/
    gap: 4px;

    first:child {
      display: flex;
    }
  }
`;
