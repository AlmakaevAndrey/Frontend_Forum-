import { useNavigate } from 'react-router-dom';
import * as S from './UserList.styles';
import { ReactNode } from 'react';
import { User } from '../../../components/User1/userTypes';
import { UserCard } from '../../../components/User1/ui/UserCard';

interface UserProps {
  users: User[];
  children?: ReactNode;
}

export const UserList = ({ users }: UserProps) => {
  return (
    <S.List>
      {users.map((user) => (
        <UserCard key={user._id || user.email} user={user} />
      ))}
    </S.List>
  );
};
