import { User } from '../userTypes';
import * as S from './UserCard.styles';

interface UserProps {
  user: User;
}

export const UserCard = ({ user }: UserProps) => {
  return (
    <S.Card>
      <S.Title>Пользователь</S.Title>
      <S.SpanItem>{user.avatar || '-'}</S.SpanItem>
      <S.SpanItem>{user.role || '-'}</S.SpanItem>
      <S.SpanItem>{user.email || '-'}</S.SpanItem>
      <S.SpanItem>{user.username || '-'}</S.SpanItem>
    </S.Card>
  );
};
