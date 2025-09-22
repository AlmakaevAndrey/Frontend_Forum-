import { useLoginMutation, useRegisterMutation } from '../../../api/apiSlice';
import { loginSuccess } from '../../../auth/authSlice';
import MyButton from '../../../components/Button/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../shared/lib/toast';
import * as S from './SignUpPage.styled';
import { useNavigate } from 'react-router-dom';

const SignUnPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register, { isLoading: isRegister }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showInfo, showError } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ username, email, password }).unwrap();
      showInfo('Регистрация прошла успешно!');

      const res = await login({ email, password }).unwrap();
      localStorage.setItem('token', res.token);
      dispatch(
        loginSuccess({
          user: res.user,
          token: res.user.token,
          role: res.user.role,
        })
      );

      showInfo('Вы успешно вошли!');
      console.log('навигация на главную страницу');
      navigate('/', { replace: true });
    } catch (err: any) {
      showError(err?.data?.message || 'Ошибка при регистрации');
    }
  };

  return (
    <S.ContentWrapper>
      <S.SignUpForm onSubmit={handleRegister}>
        <S.TitleText>Регистрация на Форуме</S.TitleText>
        <S.SignUpInput
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <S.SignUpInput
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.SignUpInput
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <S.MySignUpButton disabled={isRegister || isLoggingIn}>
          {isRegister || isLoggingIn ? 'Loading...' : 'Sign Up'}
        </S.MySignUpButton>
      </S.SignUpForm>
    </S.ContentWrapper>
  );
};

export default SignUnPage;
