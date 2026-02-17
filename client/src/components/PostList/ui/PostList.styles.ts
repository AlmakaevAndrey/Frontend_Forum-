import styled from 'styled-components';

export const List = styled.div`
  width: 100%;
  margin: 0 0 20px 0;
  max-width: 1200px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: masonry;
  gap: 20px;

  @media (max-width: 460px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;
