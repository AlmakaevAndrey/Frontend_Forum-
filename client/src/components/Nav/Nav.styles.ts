import MyButton from '../Button/Button';
import styled, { keyframes } from 'styled-components';

interface NavigationProps {
  $isOpen: boolean;
}

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
`;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInLinks = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Navigation = styled.nav<NavigationProps>`
  display: flex;
  align-items: center;
  gap: 6px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.2s ease;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: scale(1.1);
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media (min-width: 910px) {
    position: static;
  }

  @media (max-width: 910px) {
    position: fixed;
    top: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    left: 0;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.colors.background || '#fff'};);
    gap: 20px;
    padding: ${({ $isOpen }) => ($isOpen ? '80px 0 40px' : '0')};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: ${({ $isOpen }) => ($isOpen ? slideDown : 'none')} 0.4s ease
      forwards;
    transition:
      top 0.4s ease,
      padding 0.3s ease;
    z-index: 999;
    a {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.text};
      opacity: 0;
      animation: ${({ $isOpen }) => ($isOpen ? fadeInLinks : 'none')} 0.4s ease
        forwards;
    }

    a:nth-child(1) {
      animation-delay: 0.1s;
    }
    a:nth-child(2) {
      animation-delay: 0.2s;
    }
    a:nth-child(3) {
      animation-delay: 0.3s;
    }
    a:nth-child(4) {
      animation-delay: 0.4s;
    }
    a:nth-child(5) {
      animation-delay: 0.5s;
    }
  }
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 998;
`;

export const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;

  @media (max-width: 910px) {
    display: block;
  }
`;

export const Underscore = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

export const List = styled.li`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #007bff;
    }
  }
`;

export const LanguageButton = styled(MyButton).attrs({ as: 'a' })`
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
