import styled from 'styled-components';

export const ArticleSection = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .ql-container {
    width: 100%;
    min-height: 300px;
    border-radius: 0 0 8px 8px;
    border: 1px solid #ddd;
    background: ${({ theme }) => theme.colors.backgroundInput};
    color: ${({ theme }) => theme.colors.textBlack};
    font-size: 16px;
  }

  .ql-editor {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.6;
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
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  @media (max-width: 768px) {
    padding: 0 0;

    .ql-container {
      min-height: 200px;
      font-size: 14px;
    }

    .ql-toolbar {
      button {
        padding: 4px;
        svg {
          width: 14px;
          height: 14px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .ql-toolbar {
      justify-content: center;
    }
  }
`;

export const Content = styled.form``;
