import React, { useEffect, useState } from 'react';
import * as S from './ThemeToggle.styles';

type toggleProps = {
  onThemeChange: (isDark: boolean) => void;
};

export const ThemeToggle: React.FC<toggleProps> = ({ onThemeChange }) => {
  const [isDark, setIsDark] = React.useState<boolean>(
    () => localStorage.getItem('theme') === 'dark'
  );

  React.useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    onThemeChange(isDark);
  }, [isDark, onThemeChange]);

  return (
    <S.Switch>
      <S.HiddenInput
        type='checkbox'
        checked={isDark}
        onChange={() => setIsDark((prev) => !prev)}
      />

      <S.Slider>
        <S.SunMoon className='sun-moon'>
          <S.MoonDot $left={10} $top={3} $size={6} className='moon-dot' />
          <S.MoonDot $left={2} $top={10} $size={10} className='moon-dot' />
          <S.MoonDot $left={16} $top={18} $size={3} className='moon-dot' />
        </S.SunMoon>

        {/* Clouds */}
        <S.Cloud $left={30} $top={15} $w={40} $dark />
        <S.Cloud $left={44} $top={10} $w={20} $dark />
        <S.Cloud $left={18} $top={24} $w={30} $dark />
        <S.Cloud $left={36} $top={18} $w={40} />
        <S.Cloud $left={48} $top={14} $w={20} />
        <S.Cloud $left={22} $top={26} $w={30} />

        {/* Stars */}
        <S.Stars className='stars'>
          <S.Star $size={8} $top={2} $left={3} $delay='0.3s' />
          <S.Star $size={6} $top={16} $left={3} />
          <S.Star $size={8} $top={20} $left={10} $delay='0.6s' />
          <S.Star $size={10} $top={0} $left={18} $delay='1.3s' />
        </S.Stars>
      </S.Slider>
    </S.Switch>
  );
};

type languageSwitchProps = {
  onThemeChange: (isDark: boolean) => void;
};

export default ThemeToggle;
