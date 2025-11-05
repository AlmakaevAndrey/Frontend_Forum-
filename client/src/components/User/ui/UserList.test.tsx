import { render } from '@testing-library/react';
import { UserList } from './UserList';
import { User } from '../../../components/User1/userTypes';

jest.mock('../../../components/User1/ui/UserCard', () => ({
  UserCard: jest.fn(() => <div data-testid='user-card' />),
}));

const mockUserCard = require('../../../components/User1/ui/UserCard').UserCard;

describe('UserList component', () => {
  const users: User[] = [
    {
      _id: '1',
      id: '1',
      username: 'almakaevandrey',
      email: 'almakaevandrey12345@gmail.com',
      role: 'user',
      avatar: 'https://example.com/a.jpg',
    },
    {
      _id: '2',
      id: '2',
      username: 'Bob',
      email: 'b@mail.com',
      role: 'admin',
      avatar: 'https://example.com/b.jpg',
    },
  ];

  it('renders a list of users', () => {
    render(<UserList users={users} />);

    expect(mockUserCard).toHaveBeenCalledWith(
      expect.objectContaining({ user: users[0] }),
      expect.any(Object)
    );
    expect(mockUserCard).toHaveBeenCalledWith(
      expect.objectContaining({ user: users[1] }),
      expect.any(Object)
    );
  });
});
