export type Post = {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  likes: { likes: string; ref: 'User' }[];
  date: string;
  comments: Comment[];
};

export type Comment = {
  userId: string;
  username: string;
  text: string;
  createdAt: string;
};
