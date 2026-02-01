import styled from 'styled-components';

export const Card = styled.div`
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
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 560px) {
    font-size: 20px;
  }
`;

export const Excerpt = styled.p`
  width: 100%;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: break-word;

  @media (max-width: 560px) {
    font-size: 16px;
  }
`;

export const SpanItem = styled.span`
  display: flex;
  align-items: baseline;
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

export const Span = styled.span`
  font-size: 22px;
  display: flex;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
  }

  span {
    display: flex;
    align-items: center;
    gap: 4px;

    first:child {
      display: flex;
    }
  }
`;
