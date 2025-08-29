import React, { ReactNode } from 'react';
import { IconGitHub } from '../../assets/svg/GitHubLogo';

const Footer: React.FC = () => {
  const currentDate = new Date().getFullYear();
  return (
    <footer>
      <IconGitHub href="https://github.com/AlmakaevAndrey" />
      Almakaev Andrey | {currentDate}
    </footer>
  );
};

export default Footer;
