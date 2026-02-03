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

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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

export const Email = styled.span`
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const Label = styled.span`
  opacity: 0.6;
`;
