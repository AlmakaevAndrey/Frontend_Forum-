import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostFilters } from './PostFilters';
import '@testing-library/jest-dom';
import { act } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('PostFilters', () => {
  const onChangeMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it('renders form elements correctly', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostFilters onChange={onChangeMock} />
      </ThemeProvider>
    );

    expect(
      screen.getByPlaceholderText('postFilters.inputPlaceholder')
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'postFilters.buttonSubmit' })
    ).toBeInTheDocument();
  });

  it('shows validation error when query is too short', async () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostFilters onChange={onChangeMock} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText('postFilters.inputPlaceholder');
    const button = screen.getByRole('button', {
      name: 'postFilters.buttonSubmit',
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.click(button);
    });

    expect(await screen.findByText('Минимум 2 символа')).toBeInTheDocument();
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('calls onChange with correct values when form is valid', async () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostFilters onChange={onChangeMock} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText('postFilters.inputPlaceholder');
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button', {
      name: 'postFilters.buttonSubmit',
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Test query' } });
      fireEvent.change(select, { target: { value: 'likes' } });
      fireEvent.click(button);
    });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({
      query: 'Test query',
      sort: 'likes',
    });
  });
});
