import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  gap: 10px;
  // margin: 20px 20px;
  padding: 20px;
  margin: 0 0 20px 0;
  background: ${({ theme }) => theme.colors.primary};

  @media (max-width: 480px) {
    padding: 10px;
    gap: 6px;
  }
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
  align-items: center;
  gap: 10px;
`;

export const Navigation = styled.nav`
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

  @media (max-width: 520px) {
    display: flex;
    gap: 0;
  }
`;

export const Linked = styled.link``;
