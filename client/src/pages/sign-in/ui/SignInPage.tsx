import React, { useState } from 'react';
import { useLoginMutation } from '../../../api/apiSlice';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../auth/authSlice';
import { toast } from 'react-toastify';
import { useToast } from '../../../shared/lib/toast';
import Button from '../../../components/Button/Button';
import * as S from './SignIn.styles';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { showInfo, showError } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      showInfo('Загрузка вашего запроса');
    } catch (err: any) {
      showError(err?.data?.message || 'Ошибка при загрузке');
    }
  };
  return (
    <S.ContentWrapper>
      <S.SignInForm action='action' onSubmit={handleLogin}>
        <S.TitleText>Регистрация на Форуме</S.TitleText>
        <S.SignInInput
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.SignInInput
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <S.MySignInButton disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Sign in'}
        </S.MySignInButton>
      </S.SignInForm>
    </S.ContentWrapper>
  );
};

export default SignInPage;
