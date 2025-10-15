export type User = {
  id: string;
  username: string;
  _id: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar: string;
};
