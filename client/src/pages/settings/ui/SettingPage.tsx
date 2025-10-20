import ProfilePage from '../../../pages/profile/ui/ProfilePage';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import * as S from './SettingPage.styles';
import { PostList } from '../../../components/PostList/ui/PostList';
import { UserList } from '../../../components/User/ui/UserList';
import { useGetPostsQuery, useGetUsersQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';

const SettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'posts'>(
    'profile'
  );
  const {
    data: posts = [],
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostsQuery();
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
    if (isPostLoading || isUsersLoading) showInfo('Загрузка');
    if (isPostError || isUsersError) showError('Ошибка при загрузке');
  }, [
    isPostLoading,
    isUsersLoading,
    isPostError,
    isUsersError,
    showInfo,
    showError,
  ]);

  //   const content = useMemo(() => {
  //   switch (activeTab) {
  //     case 'profile':
  //       return <ProfilePage />;

  //     case 'users':
  //       if (isUsersLoading) return <p>Загрузка пользователей...</p>;
  //       if (isUsersError) return <p>Ошибка загрузки пользователей</p>;
  //       return users.length ? <UserList users={users} /> : <p>Нет пользователей</p>;

  //     case 'posts':
  //       if (isPostsLoading) return <p>Загрузка постов...</p>;
  //       if (isPostsError) return <p>Ошибка загрузки постов</p>;
  //       return <PostList posts={posts} />;

  //     default:
  //       return null;
  //   }
  // }, [activeTab, users, posts, isUsersLoading, isUsersError, isPostsLoading, isPostsError]);

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
