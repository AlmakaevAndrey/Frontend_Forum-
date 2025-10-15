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
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
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
