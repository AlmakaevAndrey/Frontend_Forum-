import React, { useState } from 'react';
import { useLoginMutation } from '../../../api/apiSlice';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../auth/authSlice';
import { useToast } from '../../../shared/lib/toast';
import * as S from './SignInPage.styles';
import { useTranslation } from 'react-i18next';

const SignInPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { showInfo, showError } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(
        loginSuccess({ user: res.user, token: res.token, role: res.user.role })
      );
      showInfo(t('common.profile'));
    } catch (err: any) {
      showError(err?.data?.message || t('common.fetchError'));
    }
  };
  return (
    <S.ContentWrapper>
      <S.SignInForm action='action' onSubmit={handleLogin}>
        <S.TitleText>{t('signIn.title')}</S.TitleText>
        <S.SignInInput
          type='email'
          placeholder={t('common.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.SignInInput
          type='password'
          placeholder={t('signUp.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <S.MySignInButton disabled={isLoading}>
          {isLoading ? t('common.loading') : t('signIn.signIn')}
        </S.MySignInButton>
      </S.SignInForm>
    </S.ContentWrapper>
  );
};

export default SignInPage;
