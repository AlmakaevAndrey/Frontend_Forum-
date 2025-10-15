import ProfilePage from '../../../pages/profile/ui/ProfilePage';
import React, { useEffect, useMemo, useState } from 'react';
import * as S from './SettingPage.styles';
import { PostList } from '../../../components/PostList/ui/PostList';
import { UserList } from '../../../components/User/ui/UserList';
import { useGetPostsQuery, useGetUsersQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';

const SettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'posts'>(
    'profile'
  );
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery();
  const { showInfo, showError } = useToast();

  useEffect(() => {
    console.log('Users from API:', users);
  }, [users]);

  useEffect(() => {
    if (isLoading) {
      showInfo('Загрузка');
    } else if (isError) {
      showError('Ошибка при загрузке');
    }
  }, [isLoading, isError, showInfo, showError]);

  return (
    <S.SettingsWrapper>
      <S.Sidebar>
        <h1>Setting Page</h1>
        <S.SidebarItem
          $active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </S.SidebarItem>
        <S.SidebarItem
          $active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </S.SidebarItem>
        <S.SidebarItem
          $active={activeTab === 'posts'}
          onClick={() => setActiveTab('posts')}
        >
          Посты
        </S.SidebarItem>
      </S.Sidebar>
      <S.Content>
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'users' && (
          <>
            {users && users.length > 0 ? (
              <UserList users={users} />
            ) : (
              <p> Нет пользователей или ошибка загрузки</p>
            )}
          </>
        )}
        {activeTab === 'posts' && <PostList posts={posts} />}
      </S.Content>
    </S.SettingsWrapper>
  );
};

export default SettingPage;
