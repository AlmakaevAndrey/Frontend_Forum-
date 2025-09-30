import styled from 'styled-components';

export const ArticleForm = styled.form`
  .ql-container {
    max-width: 900px;
    width: 500px;
  }

  .ql-editor {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background: ${({ theme }) => theme.colors.backgroundInput};
    color: ${({ theme }) => theme.colors.textBlack};
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
  }
`;
export const Content = styled.form``;
