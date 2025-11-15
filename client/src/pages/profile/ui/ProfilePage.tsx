import { RootState } from '../../../api/store';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../../shared/lib/toast';
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useUpdateUserMutation,
} from '../../../api/apiSlice';
import * as S from './ProfilePage.styles';
import MyButton from '../../../components/Button/Button';
import { MyCustomButton } from '../../../components/Button/Button.styles';
import { updateUserProfile } from '../../../auth/authSlice';
import { Post } from '../../../components/Post/types';
import { useTranslation } from 'react-i18next';

interface ProfilePageProps {
  variant?: 'profile' | 'settings';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  variant = 'profile',
}) => {
  const { t } = useTranslation();
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const { showInfo, showError } = useToast();
  const dispatch = useDispatch();

  const { data: posts = [], isLoading, error } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingExcerpt, setEditingExcerpt] = useState('');
  const [editingUsername, setEditUsername] = useState(user?.username || '');

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const selectAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append('username', editingUsername);

      if (selectedAvatar) {
        formData.append('avatar', selectedAvatar);
      }

      const response = await updateUser(formData).unwrap();
      dispatch(updateUserProfile(response.user));

      showInfo(t('profile.userUpdated'));
      setSelectedAvatar(null);
      setPreview(null);
    } catch (error) {
      showError(t('profile.avatarUpdateError'));
    }
  };

  const userPosts = useMemo<Post[]>(() => {
    if (!posts || !user?.id) return [];

    return posts.filter((p) => {
      if (!p.author) return false;

      if (typeof p.author === 'object') {
        const authorObj = p.author as any;
        return authorObj._id === user.id || authorObj.id === user.id;
      }

      return p.author === user.username;
    });
  }, [posts, user?.id, user?.username]);

  const handleEditClick = (post: Post) => {
    setEditingPostId(post._id);
    setEditingTitle(post.title);
    setEditingExcerpt(post.excerpt);
  };

  const handleSave = async (id: string) => {
    try {
      await updatePost({
        id,
        data: { title: editingTitle, excerpt: editingExcerpt },
      }).unwrap();
      showInfo(t('profile.postUpdated'));
      setEditingPostId(null);
    } catch (error) {
      showError(t('profile.postUpdateError'));
    }
  };

  if (!token) return <div>{t('profile.notAuthorized')}</div>;

  return (
    <S.ProfileWrapper>
      <S.ProfileCard variant={variant}>
        <h1>{t('profile.title')}</h1>
        <S.AvatarWrapper>
          {preview ? (
            <img src={preview} alt='preview' width={100} />
          ) : user?.avatar ? (
            <img
              src={`http://localhost:5000${encodeURI(user.avatar)}`}
              alt='avatar'
              width={100}
            />
          ) : (
            <span style={{ fontSize: 50 }}>👨‍💻</span>
          )}

          <S.Input type='file' accept='image/*' onChange={selectAvatarChange} />
          <MyCustomButton onClick={handleUpdateUser} disabled={updating}>
            {updating ? t('profile.loading') : t('profile.upload')}
          </MyCustomButton>
        </S.AvatarWrapper>
        <p>
          {t('profile.username')} {user?.username}
        </p>
        <S.AvatarWrapper>
          <S.Input
            value={editingUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <MyButton onClick={handleUpdateUser}>{t('profile.change')}</MyButton>
        </S.AvatarWrapper>
        <p>
          {t('profile.email')} {user?.email}
        </p>
        {/* Нужно сделать аватар с функционалом */}
        <p>
          {t('profile.role')} {user?.role}
        </p>
      </S.ProfileCard>

      <S.PostsSection>
        <h2>{t('profile.postsTitle')}</h2>
        {isLoading && <p>{t('profile.Loading')}</p>}
        {error && <p>{t('common.fetchError')}</p>}

        {!isLoading && !error && (
          <>
            {Array.isArray(userPosts) && userPosts.length > 0 ? (
              userPosts.map((post) => (
                <S.PostCard variant={variant} key={post._id}>
                  {editingPostId === post._id ? (
                    <>
                      <S.Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                      />
                      <textarea
                        value={editingExcerpt}
                        onChange={(e) => setEditingExcerpt(e.target.value)}
                      ></textarea>
                      <MyButton onClick={() => handleSave(post._id)}>
                        {t('buttons.save')}
                      </MyButton>
                      <MyButton onClick={() => setEditingPostId(null)}>
                        {t('buttons.cancel')}
                      </MyButton>
                    </>
                  ) : (
                    <>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <MyButton onClick={() => handleEditClick(post)}>
                        {t('profile.change')}
                      </MyButton>
                    </>
                  )}
                </S.PostCard>
              ))
            ) : (
              <p>{t('profile.noPosts')}</p>
            )}
          </>
        )}
      </S.PostsSection>
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
