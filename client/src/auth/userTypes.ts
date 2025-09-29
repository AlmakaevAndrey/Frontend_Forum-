export type User = {
  avatar: string;
  id: string;
  username: string;
  role: 'admin' | 'user' | 'guest';
  email: string;
};
