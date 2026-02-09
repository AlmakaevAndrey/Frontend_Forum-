import React from 'react';
import * as S from './LanguageToggler.styled';

type Props = {
  value: boolean;
  onChange: (val: boolean) => void;
  'data-testid': string;
};

const LangToggle: React.FC<Props> = ({
  value,
  onChange,
  'data-testid': string,
}) => {
  return (
    <S.Switch data-testid={string}>
      <S.HiddenInput
        type='checkbox'
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <S.Slider />
    </S.Switch>
  );
};

export default LangToggle;
