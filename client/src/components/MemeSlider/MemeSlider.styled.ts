import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 500px;
  margin: 0 auto;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.backgroundSecond};
  padding: 10px;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 730px) {
    height: 480px;
  }

  @media (max-width: 680px) {
    height: 460px;
  }

  @media (max-width: 570px) {
    height: 420px;
  }

  @media (max-width: 530px) {
    height: 380px;
  }
  @media (max-width: 440px) {
    height: 330px;
  }
`;

export const Slider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  width: 100%;
  height: 100%;

  @media (max-width: 470px) {
    gap: 10px;
  }
`;

export const Center = styled.div`
  width: 600px;
  height: 450px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border-radius: 16px;
`;

export const Side = styled.img`
  width: 20%;
  height: 70%;
  object-fit: contain;
  border-radius: 12px;
  opacity: 0.5;
  filter: grayscale(40%);
  transition: 0.3s;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  background: transparent;
  border: none;
  font-size: 42px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const PrevButton = styled(Button)`
  left: 10px;
  z-index: 10;
`;

export const NextButton = styled(Button)`
  right: 10px;
  z-index: 10;
`;
