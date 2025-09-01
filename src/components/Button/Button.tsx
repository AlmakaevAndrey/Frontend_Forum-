import React, { ReactNode } from 'react';
import { MyCustomButton } from './Button.styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const MyButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <MyCustomButton onClick={onClick}>{children}</MyCustomButton>;
};

export default MyButton;
