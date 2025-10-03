import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    color: red;
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border || '#ccc'};
  border-radius: 6px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#007bff'};
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border || '#ccc'};
  border-radius: 6px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#007bff'};
  }
`;

export const Button = styled.button`
  padding: 10px 14px;
  background: ${({ theme }) => theme.colors.primary || '#007bff'};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary || '#0056b3'};
  }
`;
