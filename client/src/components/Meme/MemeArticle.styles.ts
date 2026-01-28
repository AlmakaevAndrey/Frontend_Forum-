import styled from 'styled-components';

export const MemeCard = styled.article<{ $disabled?: boolean }>`
  padding: 20px;
  margin: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.backgroundInput};
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  // 
  filter: ${({ $disabled }) => ($disabled ? 'blur(2px)' : 'none')}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 760px) {
    padding: 10px;
    margin: 10px;
    gap: 6px;
  }

  @media (max-width: 560px) {
    padding: 6px;
    margin: 0;

    gap: 4px;
  }
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
  color: black;
  font-size: 14px;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#007bff'};
  }
  @media (max-width: 460px) {
    font-size: 14px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 860px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  @media (max-width: 560px) {
    font-size: 14px;
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

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;

  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  display: flex;
  align-items: center;
  justify-content: center;
`;
