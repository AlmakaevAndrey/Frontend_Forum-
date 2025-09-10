import React, { ReactNode } from 'react';
import { IconGitHub } from '../../assets/svg/GitHubLogo';
import { FooterWrapper } from './Footer.styled';

const Footer: React.FC = () => {
  const currentDate = new Date().getFullYear();
  return (
    <FooterWrapper>
      <IconGitHub href='https://github.com/AlmakaevAndrey' />
      Almakaev Andrey | {currentDate}
    </FooterWrapper>
  );
};

export default Footer;
