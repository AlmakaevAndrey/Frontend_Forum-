import styled from 'styled-components';

export const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const EditForm = styled.article`
  max-width: 800px;
  width: 100%;
  margin: 160px auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.text};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  resize: vertical;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.text};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content:;
  gap: 12px;
  margin-top: 20px;
`;

export const MyButton = styled.div`
  width: 86px;
  height: 36px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

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
`;
