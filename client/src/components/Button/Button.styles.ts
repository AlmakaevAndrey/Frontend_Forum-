import styled from 'styled-components';

export const MyCustomButton = styled.button`
  width: 90px;
  padding: 0 6px;
  height: 36px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  background: ${({ theme }) => theme.colors.svg};
  color: ${({ theme }) => theme.colors.textBlack};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.89);
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (max-width: 420px) {
    font-size: 14px;
    width: 80px;
  }
`;
