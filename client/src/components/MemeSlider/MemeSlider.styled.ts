import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 620px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.backgroundSecond};
  padding: 10px;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 590px) {
    height: 600px;
  }

  @media (max-width: 530px) {
    height: 560px;
  }

  @media (max-width: 440px) {
    height: 520px;
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
    height: 80%;
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

  @media (max-width: 860px) {
    height: 480px;
  }

  @media (max-width: 680px) {
    height: 500px;
  }

  @media (max-width: 620px) {
    height: 426px;
  }

  @media (max-width: 530px) {
    height: 410px;
  }
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

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  height: 36px;
  padding: 0 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.svg};
  color: ${({ theme }) => theme.colors.textBlack};

  @media (max-width: 460px) {
    padding: 0 6px;
    font-size: 14px;
    height: 30px;
  }
`;

export const AddMemeButton = styled.button`
  width: 80px;
  padding: 0 4px;
  height: 36px;
  border-radius: 20px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

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

  @media (max-width: 460px) {
    padding: 0 6px;
    font-size: 14px;
    height: 30px;
    width: 58px;
  }
`;

export const AddMemeWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 730px) {
    padding: 0;
    margin: 0 0 30px 0;
  }
  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

export const Icon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
`;

export const Preview = styled.img`
  width: 70px;
  height: 70px;
  margin: 10px 10px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.svg};

  @media (max-width: 480px) {
    padding: 0;
    margin: 0;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;
