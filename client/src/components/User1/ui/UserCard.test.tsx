import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';
import { User } from '../userTypes';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('./UserCard.styles', () => {
  const React = require('react');
  return new Proxy(
    {},
    {
      get: (_, prop) => (props: any) =>
        React.createElement(
          'div',
          { 'data-testid': prop, ...props },
          props.children
        ),
    }
  );
});

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
    expect(screen.getByTestId('Card')).toBeInTheDocument();
  });

  it('displays the title with translation key', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('Title')).toHaveTextContent('common.user');
  });

  it('renders user data correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getAllByTestId('SpanItem')[0]).toHaveTextContent('admin');

    expect(screen.getByTestId('Email')).toHaveTextContent('user@example.com');

    expect(screen.getAllByTestId('SpanItem')[1]).toHaveTextContent('testUser');
  });

  it('renders "-" when user fields are empty', () => {
    const emptyUser = { avatar: '', role: '', email: '', username: '' };
    render(<UserCard user={emptyUser as User} />);

    const spanItems = screen.getAllByTestId('SpanItem');
    spanItems.forEach((el) => {
      expect(el).toHaveTextContent('-');
    });

    expect(screen.getByTestId('Email')).toHaveTextContent('-');
  });
});
