import styled from 'styled-components';

export const ContentWrapper = styled.div`
  height: 100%;
  max-width: 1440px;
  width: 100%;
  display: flex;
  flex-direction: column;
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

export const SignInForm = styled.form`
  max-width: 460px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px 0;
  gap: 20px;
  font-weight: 500;
  font-size: 16px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  outline: none;
  transition: all 0.3s ease;

  @media (max-width: 446px) {
    width: 350px;
  }

  input:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
  }

  input::placeholder {
    color: #888;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export const ShowButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  opacity: 0.5;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;

export const SignInInput = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-color: ${({ theme }) => theme.colors.text};

  @media (max-width: 446px) {
    width: 300px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.background};
  }
`;

export const MySignInButton = styled.button`
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

  @media (max-width: 446px) {
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
