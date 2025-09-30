// ProfilePage.styles.ts
import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 160px auto;
`;

export const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PostsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.text};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  resize: vertical;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.text};
  }
`;

export const PostCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 5px;
  }

  textarea {
    width: 100%;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #ccc;
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.text};
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 15px;
`;
