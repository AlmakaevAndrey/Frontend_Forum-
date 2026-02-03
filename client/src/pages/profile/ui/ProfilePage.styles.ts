import styled from 'styled-components';

interface ProfileProps {
  variant?: 'profile' | 'settings';
}

export const ProfileWrapper = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 160px auto;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: center;

  @media (max-width: 700px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const MyText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

export const MyPostTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 700px) {
    font-size: 18px;
  }
`;

export const MyParagraph = styled.p`
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 700px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ProfileCard = styled.div<ProfileProps>`
  background: ${({ variant, theme }) =>
    variant === 'profile' ? theme.colors.primary : theme.colors.background};
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 480px) {
    width: 350px;
    padding: 10px 20px;
  }

  @media (max-width: 400px) {
    width: 296px;
    padding: 10px 20px;
  }

  div {
    display: flex;
    align-items: flex-start;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ffffffff;
    margin-right: 10px;
  }
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 780px) {
    font-size: 1rem;
  }
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
  border: 1px solid #ffffffff;
  margin-bottom: 20px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
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

export const PostCard = styled.div<ProfileProps>`
  background: ${({ variant, theme }) =>
    variant === 'profile' ? theme.colors.primary : theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    width: 330px;
    padding: 12px;
  }
  @media (max-width: 400px) {
    width: 300px;
    padding: 12px;
  }

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

export const Span = styled.span`
  font-size: 22px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
