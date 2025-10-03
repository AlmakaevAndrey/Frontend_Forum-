import styled from 'styled-components';

export const ContentWrapper = styled.div`
  height: 100%;
  max-width: 1440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSecond};
`;

export const TitleText = styled.h2`
  margin: 30px 0;
  display: flex;
  justify-content: center;
`;

export const SignUpForm = styled.form`
  width: 460px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 160px 0;
  gap: 20px;
  font-weight: 500;
  font-size: 16px;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.border};

  @media (max-width: 476px) {
    width: 350px;
  }
`;

export const SignUpInput = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.text};

  @media (max-width: 476px) {
    width: 300px;
  }

  input:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
  }

  input::placeholder {
    color: #888;
  }
`;

export const MySignUpButton = styled.button`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.svg};
  color: ${({ theme }) => theme.colors.textBlack};

  @media (max-width: 476px) {
    width: 300px;
  }

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
`;
