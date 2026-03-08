import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const Difficulty = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
`;

export const DifficultyButton = styled.button`
  flex: 1;
  width: 80px;
  padding: 8px 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.backgroundInput};
  }

  &.active {
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    font-weight: 600;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddMemeButton = styled.button`
  width: 95%;
  padding: 10px 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textBlack};
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const CancelButton = styled(AddMemeButton)`
  background: #9e9e9e;

  &:hover:not(:disabled) {
    background: #757575;
  }
`;

export const AddMemeWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    max-width: 400px; // ограничиваем ширину
    max-height: 400px; // ограничиваем высоту
    width: auto;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
  }
`;

export const Preview = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundSecond};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
  }

  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    white-space: pre-wrap;
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const ErrorMessage = styled.div`
  padding: 12px;
  margin-bottom: 12px;
  background: #ffebee;
  border: 1px solid #ef5350;
  border-radius: 4px;
  color: #c62828;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '⚠️';
  }
`;
