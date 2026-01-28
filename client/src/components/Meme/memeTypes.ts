import { ImgHTMLAttributes } from 'react';

export type Meme = {
  _id: string;
  imgURL: string;
  author: string;
  authorAvatar?: string;
  likes: { likes: string; ref: 'Meme' }[];
  date: string;
};
