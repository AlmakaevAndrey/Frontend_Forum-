import { useTranslation } from 'react-i18next';
import { User } from '../userTypes';
import * as S from './UserCard.styles';

interface UserProps {
  user: User;
}

export const UserCard = ({ user }: UserProps) => {
  const { t } = useTranslation();

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://frontend-forum.onrender.com'
      : 'http://localhost:5000';
  if (!user) return null;

  const hasAvatar =
    typeof user.avatar === 'string' && user.avatar.trim() !== '';

  const avatarSrc = hasAvatar
    ? user.avatar.startsWith('http')
      ? user.avatar
      : `${API_URL}${encodeURI(user.avatar)}`
    : `${API_URL}/uploads/user.png`;

  return (
    <S.Card>
      <S.Title>{t('common.user')}</S.Title>
      <S.Avatar src={avatarSrc} alt={user.username} />
      {/* '👨‍💻' */}
      <S.Info>
        <S.Row>
          <S.Label>Role:</S.Label>
          <S.SpanItem>{user.role || '-'}</S.SpanItem>
        </S.Row>
        <S.Row>
          <S.Label>Email:</S.Label>
          <S.Email>{user.email || '-'}</S.Email>
        </S.Row>
        <S.Row>
          <S.Label>Username:</S.Label>
          <S.SpanItem>{user.username || '-'}</S.SpanItem>
        </S.Row>
      </S.Info>
    </S.Card>
  );
};
