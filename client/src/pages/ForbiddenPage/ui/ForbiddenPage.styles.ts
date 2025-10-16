import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

export const Title = styled.h1`
  font-size: 96px;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary};
`;

export const Message = styled.p`
  font-size: 28px;
  text-align: justify;
  max-width: 500px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.button`
  width: 220px;
  height: 60px;
  margin: 20px 0 0 0;
  border-radius: 20px;
  font-weight: 550;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  z-index: 1;

  background: ${({ theme }) => theme.colors.svg};
  color: ${({ theme }) => theme.colors.textBlack};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
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
`;
