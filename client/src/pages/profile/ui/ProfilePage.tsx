import { RootState } from '../../../api/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../../shared/lib/toast';
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useUploadAvatarMutation,
  useUpdateUserPostMutation,
} from '../../../api/apiSlice';
import * as S from './ProfilePage.styles';
import MyButton from '../../../components/Button/Button';
import { MyCustomButton } from '../../../components/Button/Button.styles';
import { updateUserProfile } from '../../../auth/authSlice';

export const ProfilePage: React.FC = () => {
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const { showInfo, showError } = useToast();
  const dispatch = useDispatch();

  const { data: posts, isLoading, error } = useGetPostsQuery(undefined);
  const [updatePost] = useUpdatePostMutation();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingExcerpt, setEditingExcerpt] = useState('');

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const [editingUsername, setEditUsername] = useState(user?.username || '');
  const [updateUser] = useUpdateUserPostMutation();

  const selectAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedAvatar) return;
    const formData = new FormData();
    formData.append('avatar', selectedAvatar);

    try {
      console.log('JWT:', localStorage.getItem('token'));

      const response = await uploadAvatar(formData).unwrap();
      await updateUser({ avatar: response.avatar }).unwrap();

      dispatch(updateUserProfile({ avatar: response.avatar }));
      showInfo('Аватар обновлен!');
      setPreview(null);
      setSelectedAvatar(null);
    } catch (error) {
      showError('Ошибка при загрузке аватара');
    }
  };

  const handleUsernameSave = async () => {
    try {
      await updateUser({ username: editingUsername }).unwrap();
      dispatch(updateUserProfile({ username: editingUsername }));

      showInfo('Никнейм изменен!');
    } catch (error) {
      showError('Ошибка обновления ника');
    }
  };

  const userPosts =
    posts?.filter((p) => p.author.toString() === user?.id) ?? [];

  const handleEditClick = (postsId: string, title: string, excerpt: string) => {
    setEditingPostId(postsId);
    setEditingTitle(title);
    setEditingExcerpt(excerpt);
  };

  const handleSave = async (editingPostId: string) => {
    try {
      await updatePost({
        id: editingPostId,
        data: { title: editingTitle, excerpt: editingExcerpt },
      }).unwrap();
      showInfo('Пост оновлен');
      setEditingPostId(null);
    } catch (error) {
      showError('Ошбика обновлении поста');
    }
  };

  if (!token) return <div>Вы не авторизованы</div>;

  return (
    <S.ProfileWrapper>
      <S.ProfileCard>
        <h1>Профиль пользователя</h1>
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
          <MyCustomButton onClick={handleUploadAvatar} disabled={uploading}>
            {uploading ? 'Загрузка...' : 'Загрузить'}
          </MyCustomButton>
        </S.AvatarWrapper>
        <p>Username: {user?.username}</p>
        <S.AvatarWrapper>
          <S.Input
            value={editingUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <MyButton onClick={handleUsernameSave}>Сменить</MyButton>
        </S.AvatarWrapper>
        <p>Email: {user?.email}</p>
        {/* Нужно сделать аватар с функционалом */}
        <p>Role: {user?.role}</p>
      </S.ProfileCard>

      <S.PostsSection>
        <h2>Мои посты</h2>
        {isLoading && <p>Загрузка постов</p>}
        {error && <p>Ошбика загрузки постов</p>}
        {userPosts.map((post) => (
          <S.PostCard key={post._id}>
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
                  Сохранить
                </MyButton>
                <MyButton onClick={() => setEditingPostId(null)}>
                  Отмена
                </MyButton>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <MyButton
                  onClick={() =>
                    handleEditClick(post._id, post.title, post.excerpt)
                  }
                >
                  Редактировать
                </MyButton>
              </>
            )}
          </S.PostCard>
        ))}
      </S.PostsSection>
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
