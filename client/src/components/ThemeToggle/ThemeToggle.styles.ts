import styled, { keyframes } from 'styled-components';

const cloudMove = keyframes`
  0% { transform: translateX(0px); }
  40% { transform: translateX(4px); }
  80% { transform: translateX(-4px); }
  100% { transform: translateX(0px); }
`;

const starTwinkle = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.2); }
  80% { transform: scale(0.8); }
  100% { transform: scale(1); }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  padding: 10px; 10px;
  width: 60px;
  height: 34px;
`;

export const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + div {
    background-color: black;
  }

  &:checked + div .sun-moon {
    transform: translateX(26px);
    background-color: white;
  }

  &:checked + div .moon-dot {
    opacity: 1;
  }

  &:checked + div .stars {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Slider = styled.div`
  position: absolute;
  inset: 0;
  background-color: #2196f3;
  border-radius: 34px;
  overflow: hidden;
  transition: 0.4s;
  cursor: pointer;
`;

export const SunMoon = styled.div`
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: yellow;
  border-radius: 50%;
  transition: 0.4s;
  z-index: 2;
`;

export const MoonDot = styled.div<{
  $left: number;
  $top: number;
  $size: number;
}>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: gray;
  border-radius: 50%;
  opacity: 0;
  transition: 0.4s;
`;

export const Cloud = styled.div<{
  $left: number;
  $top: number;
  $w: number;
  $dark?: boolean;
}>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  width: ${({ $w }) => $w}px;
  height: ${({ $w }) => $w * 0.6}px;
  background: ${({ $dark }) => ($dark ? '#ccc' : '#eee')};
  border-radius: 50px;
  animation: ${cloudMove} 6s infinite;
  animation-delay: ${({ $dark }) => ($dark ? '1s' : '0s')};
`;

export const Stars = styled.div`
  transform: translateY(-32px);
  opacity: 0;
  transition: 0.4s;
`;

export const Star = styled.div<{
  $size: number;
  $top: number;
  $left: number;
  $delay?: string;
}>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: white;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  animation: ${starTwinkle} 2s infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`;
