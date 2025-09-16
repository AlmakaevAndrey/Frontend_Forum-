import React, { ReactNode } from 'react';
import { MyCustomButton } from './Button.styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const MyButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <MyCustomButton onClick={onClick} disabled={disabled}>
      {children}
    </MyCustomButton>
  );
};

export default MyButton;
