import { Link } from 'react-router-dom';
import { AppContainer } from '../../../components/App';
import styled from 'styled-components';

export const ErrorWrapper = styled(AppContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 98px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary};
`;

export const Status = styled.p`
  font-size: 50px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
`;

export const BackLink = styled(Link)`
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
