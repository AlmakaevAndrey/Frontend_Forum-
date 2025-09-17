export type Role = 'admin' | 'user' | 'guest';

export const Roles: Record<Role, Role> = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
};
