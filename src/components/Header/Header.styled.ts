import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.primary};
`;

export const HeaderDivider = styled.div`
  max-width: 1440px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonDivWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 10px;

  a {
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
`;
