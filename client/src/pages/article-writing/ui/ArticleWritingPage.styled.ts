import styled from 'styled-components';

export const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 160px auto;
`;

export const ArticleForm = styled.form`
  .ql-container {
    max-width: 900px;
    width: 500px;
    border: 1px solid #ddd;

    @media (max-width: 620px) {
      max-width: 400px;
    }

    @media (max-width: 500px) {
      max-width: 300px;
    }

    @media (max-width: 410px) {
      max-width: 270px;
    }
  }

  .ql-editor {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background: ${({ theme }) => theme.colors.backgroundInput};
    color: ${({ theme }) => theme.colors.textBlack};

    @media (max-width: 620px) {
      max-width: 400px;
    }

    @media (max-width: 500px) {
      max-width: 300px;
    }

    @media (max-width: 410px) {
      max-width: 270px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px 0;
    resize: both;
    object-fit: contain;
  }

  .ql-toolbar {
    background: #ffffff;
    border-radius: 8px 8px 0 0;
    border: 1px solid #ddd;

    @media (max-width: 620px) {
      max-width: 400px;
    }

    @media (max-width: 500px) {
      max-width: 300px;
    }

    @media (max-width: 410px) {
      max-width: 270px;
    }
  }
`;

export const ArticleEditor = styled.div`
  max-width: 900px;
  min-height: 290px;
  background: ${({ theme }) => theme.colors.primary};
  margin: 40px auto;
  padding: 20px 20px 0 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.h1`
  font-size: 32px;
`;

export const Input = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  margin: 20px 0;

  @media (max-width: 620px) {
    width: 400px;
  }

  @media (max-width: 500px) {
    max-width: 300px;
  }

  @media (max-width: 410px) {
    max-width: 270px;
  }

  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-color: white;
  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.text};
  }
`;

export const MyTextArea = styled.textarea`
  width: 100%;
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

export const Content = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
  word-break: break-word;
`;

export const ToPublishButton = styled.button`
  width: 110px;
  padding: 2px;
  margin: 20px;
  height: 36px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  background: ${({ theme }) => theme.colors.svg};
  color: ${({ theme }) => theme.colors.textBlack};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.89);
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
