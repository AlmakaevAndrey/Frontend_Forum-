import styled from 'styled-components';

interface NavigationProps {
  $isOpen: boolean;
}

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Navigation = styled.nav<NavigationProps>`
  display: flex;
  align-items: center;
  gap: 10px;

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

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  }
`;

export const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
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
    color: #333;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #007bff;
    }
  }
`;
