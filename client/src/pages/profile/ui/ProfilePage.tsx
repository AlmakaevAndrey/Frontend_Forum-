import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../api/store';
import * as S from './ProfilePage.styles';
import MyButton from '../../../components/Button/Button';
import { useToast } from '../../../shared/lib/toast';
import DOMPurify from 'dompurify';
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
  useUpdateUserMutation,
} from '../../../api/apiSlice';
import { updateUserProfile } from '../../../auth/authSlice';
import { Post } from '../../../components/Post/types';
import { useTranslation } from 'react-i18next';
import { formatText } from '../../../utils/formatText';

export const ProfilePage: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { showInfo, showError } = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data: posts = [], isLoading, error } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingExcerpt, setEditingExcerpt] = useState('');
  const [editingUsername, setEditUsername] = useState(user?.username || '');
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Выбор аватара
  const selectAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Обновление пользователя
  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append('username', editingUsername);
      if (selectedAvatar) formData.append('avatar', selectedAvatar);
      const response = await updateUser(formData).unwrap();
      dispatch(updateUserProfile(response.user));
      showInfo(t('profile.userUpdated'));
      setSelectedAvatar(null);
      setPreview(null);
    } catch (err) {
      showError(t('profile.avatarUpdateError'));
    }
  };

  // Фильтр постов текущего пользователя
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
  }, [posts, user]);

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
    } catch {
      showError(t('profile.postUpdateError'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id).unwrap();
      showInfo(t('profile.postDeleted'));
      setEditingPostId(null);
    } catch {
      showError(t('profile.postDeleteError'));
    }
  };

  if (!token) return <div>{t('profile.notAuthorized')}</div>;

  return (
    <S.ProfileWrapper>
      <S.ProfileCard variant='profile'>
        <S.Title>{t('profile.title')}</S.Title>
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
            <S.Span>👨‍💻</S.Span>
          )}

          <S.Input type='file' accept='image/*' onChange={selectAvatarChange} />
          <MyButton onClick={handleUpdateUser} disabled={updating}>
            {updating ? t('profile.loading') : t('profile.upload')}
          </MyButton>
        </S.AvatarWrapper>

        <S.MyParagraph>
          <S.Span>👤 </S.Span>
          {t('profile.username')}: {user?.username}
        </S.MyParagraph>

        <S.AvatarWrapper>
          <S.Input
            value={editingUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <MyButton onClick={handleUpdateUser}>{t('profile.change')}</MyButton>
        </S.AvatarWrapper>

        <S.MyParagraph>
          <S.Span>📩 </S.Span>
          {t('profile.email')}: {user?.email}
        </S.MyParagraph>
        <S.MyParagraph>
          <S.Span>🔑 </S.Span>
          {t('profile.role')}: {user?.role}
        </S.MyParagraph>
      </S.ProfileCard>

      <S.PostsSection>
        <S.MyText>{t('profile.postsTitle')}</S.MyText>
        {isLoading && <S.MyParagraph>{t('profile.Loading')}</S.MyParagraph>}
        {error && <S.MyParagraph>{t('common.fetchError')}</S.MyParagraph>}

        {userPosts.length === 0 && !isLoading && !error && (
          <S.MyParagraphOnCenter>{t('profile.noPosts')}</S.MyParagraphOnCenter>
        )}

        {userPosts.map((post) => (
          <S.PostCard key={post._id} variant='profile'>
            {editingPostId === post._id ? (
              <>
                <S.Input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <S.TextArea
                  value={editingExcerpt}
                  onChange={(e) => setEditingExcerpt(e.target.value)}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <MyButton onClick={() => handleSave(post._id)}>
                    {t('buttons.save')}
                  </MyButton>
                  <MyButton onClick={() => setEditingPostId(null)}>
                    {t('buttons.cancel')}
                  </MyButton>
                  <MyButton onClick={() => handleDelete(post._id)}>
                    {t('buttons.delete')}
                  </MyButton>
                </div>
              </>
            ) : (
              <>
                <S.MyPostTitle>{post.title}</S.MyPostTitle>
                <S.MyParagraph
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(formatText(post.excerpt)),
                  }}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <MyButton onClick={() => handleEditClick(post)}>
                    {t('profile.change')}
                  </MyButton>
                  <MyButton onClick={() => handleDelete(post._id)}>
                    {t('buttons.delete')}
                  </MyButton>
                </div>
              </>
            )}
          </S.PostCard>
        ))}
      </S.PostsSection>
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
