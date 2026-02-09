import styled from 'styled-components';

export const Switch = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;
`;

export const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4cc9f0;
  }

  &:focus + span {
    box-shadow: 0 0 1px #4cc9f0;
  }

  &:checked + span::before {
    transform: translateX(2em);
    background-color: #4cc9f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  &:checked + span::after {
    content: 'RU';
    left: 0.5em;
    right: auto;
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 30px;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);

  &::before {
    position: absolute;
    content: '';
    height: 1.6em;
    width: 1.6em;
    border-radius: 20px;
    left: 0.2em;
    bottom: 0.2em;
    background-color: white;
    transition: 0.4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: 'EN';
    color: white;
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8em;
    transition: 0.4s;
  }
`;
