import ProfilePage from '../../../pages/profile/ui/ProfilePage';
import React, { useEffect, useState } from 'react';
import * as S from './SettingPage.styles';
import { PostCard } from '../../../components/Post/ui/PostCard';
import { UserList } from '../../../components/User/ui/UserList';
import { useGetPostsQuery, useGetUsersQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { useTranslation } from 'react-i18next';

interface ProfilePageProps {
  variant?: 'profile' | 'settings';
}

const SettingPage: React.FC<ProfilePageProps> = ({ variant = 'profile' }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'posts'>(
    'profile'
  );
  const { showError } = useToast();

  const { data: posts = [], isError: isPostError } = useGetPostsQuery();
  const { data: users = [], isError: isUsersError } = useGetUsersQuery();

  useEffect(() => {
    if (isPostError || isUsersError) showError(t('common.fetchError'));
  }, [isPostError, isUsersError, showError]);

  return (
    <S.SettingsWrapper>
      <S.Sidebar>
        <S.MyTitle>{t('common.profileSettings')}</S.MyTitle>
        <S.SidebarItem
          $active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        >
          {t('common.profile')}
        </S.SidebarItem>
        <S.SidebarItem
          $active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        >
          {t('common.user')}
        </S.SidebarItem>
        <S.SidebarItem
          $active={activeTab === 'posts'}
          onClick={() => setActiveTab('posts')}
        >
          {t('post.posts')}
        </S.SidebarItem>
      </S.Sidebar>
      <S.Content>
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'users' && (
          <>
            {users && users.length > 0 ? (
              <UserList users={users} />
            ) : (
              <p>{t('common.fetchErrorOrUser')}</p>
            )}
          </>
        )}
        {activeTab === 'posts' && (
          <S.PostsGrid>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </S.PostsGrid>
        )}
      </S.Content>
    </S.SettingsWrapper>
  );
};

export default SettingPage;
