import z from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

export const postCreateSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
});

export const memeCreateSchema = z.object({
  imgURL: z.string().min(1),
});
