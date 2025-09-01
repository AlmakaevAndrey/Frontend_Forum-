import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.primary};
`;
