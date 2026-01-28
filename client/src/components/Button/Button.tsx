import React, { ReactNode } from 'react';
import { MyCustomButton } from './Button.styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ['dataTestId']?: string;
}

const MyButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  ...rest
}) => {
  return (
    <MyCustomButton {...rest} onClick={onClick} disabled={disabled}>
      {children}
    </MyCustomButton>
  );
};

export default MyButton;
