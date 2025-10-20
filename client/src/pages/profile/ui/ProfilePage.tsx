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

export const ProfilePage: React.FC = () => {
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const { showInfo, showError } = useToast();
  const dispatch = useDispatch();

  const { data: posts, isLoading, error } = useGetPostsQuery(undefined);
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
      let payload: { username?: string; avatar?: string } = {};
      if (editingUsername) payload.username = editingUsername;
      if (selectedAvatar) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          payload.avatar = reader.result as string;
          const response = await updateUser(payload).unwrap();
          dispatch(updateUserProfile({ response }));
          showInfo('Профиль обновлен!');
          setSelectedAvatar(null);
          setPreview(null);
        };
      } else {
        const response = await updateUser(payload).unwrap();
        dispatch(updateUserProfile(response));
        showInfo('Профиль обновлен!');
      }
    } catch (error) {
      showError('Ошибка при загрузке аватара');
    }
  };

  const userPosts = useMemo<Post[]>(() => {
    if (!posts || !user?.id) return [];

    return posts.filter((p) => {
      if (!p.author) return false;

      let authorId: string | undefined;

      if (typeof p.author === 'object') {
        const authorObj = p.author as unknown;
        if ('id' in (authorObj as object)) {
          authorId = (authorObj as any).id;
        } else if ('_id' in (authorObj as object)) {
          authorId = (authorObj as any)._id;
        }
      } else {
        authorId = p.author;
      }

      return authorId === user.id;
    });
  }, [posts, user?.id]);

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
          <MyCustomButton onClick={handleUpdateUser} disabled={updating}>
            {updating ? 'Загрузка...' : 'Загрузить'}
          </MyCustomButton>
        </S.AvatarWrapper>
        <p>Username: {user?.username}</p>
        <S.AvatarWrapper>
          <S.Input
            value={editingUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <MyButton onClick={handleUpdateUser}>Сменить</MyButton>
        </S.AvatarWrapper>
        <p>Email: {user?.email}</p>
        {/* Нужно сделать аватар с функционалом */}
        <p>Role: {user?.role}</p>
      </S.ProfileCard>

      <S.PostsSection>
        <h2>Мои посты</h2>
        {isLoading && <p>Загрузка постов</p>}
        {error && <p>Ошибка загрузки постов</p>}

        {!isLoading && !error && (
          <>
            {Array.isArray(userPosts) && userPosts.length > 0 ? (
              userPosts.map((post) => (
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
                      <MyButton onClick={() => handleEditClick(post)}>
                        Редактировать
                      </MyButton>
                    </>
                  )}
                </S.PostCard>
              ))
            ) : (
              <p>У вас пока нет постов</p>
            )}
          </>
        )}
      </S.PostsSection>
    </S.ProfileWrapper>
  );
};

export default ProfilePage;
