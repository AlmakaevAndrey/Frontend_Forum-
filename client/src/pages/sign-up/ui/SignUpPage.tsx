import { useLoginMutation, useRegisterMutation } from '../../../api/apiSlice';
import { loginSuccess } from '../../../auth/authSlice';
import MyButton from '../../../components/Button/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '../../../shared/lib/toast';
import * as S from './SignUpPage.styled';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUnPage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [register, { isLoading: isRegister }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showInfo, showError } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ username, email, password }).unwrap();
      showInfo(t('signUp.register'));

      const res = await login({ email, password }).unwrap();
      localStorage.setItem('token', res.token);
      dispatch(
        loginSuccess({
          user: res.user,
          token: res.user.token,
          role: res.user.role,
        })
      );

      showInfo(t('signUp.registerClear'));
      navigate('/', { replace: true });
    } catch (err: any) {
      showError(err?.data?.message || t('signUp.failRegister'));
    }
  };

  return (
    <S.ContentWrapper>
      <S.SignUpForm onSubmit={handleRegister}>
        <S.TitleText>{t('signUp.title')}</S.TitleText>
        <S.SignUpInput
          type='text'
          placeholder={t('signUp.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <S.SignUpInput
          type='email'
          placeholder={t('common.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.InputWrapper>
          <S.SignUpInput
            type='password'
            placeholder={t('signUp.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password && (
            <S.ShowButton
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </S.ShowButton>
          )}
        </S.InputWrapper>
        <S.MySignUpButton disabled={isRegister || isLoggingIn}>
          {isRegister || isLoggingIn ? t('common.loading') : t('signUp.signUp')}
        </S.MySignUpButton>
      </S.SignUpForm>
    </S.ContentWrapper>
  );
};

export default SignUnPage;
