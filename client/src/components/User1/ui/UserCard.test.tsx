import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { UserCard } from './UserCard';
import { User } from '../userTypes';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('./UserCard.styles', () => ({
  Card: (props: any) => <div data-testid='card'>{props.children}</div>,
  Title: (props: any) => <h1 data-testid='title'>{props.children}</h1>,
  SpanItem: (props: any) => <span data-testid='span'>{props.children}</span>,
}));

describe('UserCard', () => {
  const mockUser: User = {
    avatar: 'avatar.png',
    role: 'admin',
    email: 'user@example.com',
    username: 'testUser',
    id: '1',
    _id: '1',
  };

  it('renders without crashing', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('displays the title with translation key', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('title')).toHaveTextContent('common.user');
  });

  it('renders user data correctly', () => {
    render(<UserCard user={mockUser} />);
    const spans = screen.getAllByTestId('span');

    expect(spans[0]).toHaveTextContent('avatar.png');
    expect(spans[1]).toHaveTextContent('admin');
    expect(spans[2]).toHaveTextContent('user@example.com');
    expect(spans[3]).toHaveTextContent('testUser');
  });

  it('renders "-" when user fields are empty', () => {
    const emptyUser = { avatar: '', role: '', email: '', username: '' };
    render(<UserCard user={emptyUser as User} />);
    const spans = screen.getAllByTestId('span');

    spans.forEach((span) => {
      expect(span).toHaveTextContent('-');
    });
  });
});
