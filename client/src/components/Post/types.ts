export type Post = {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: [{ likes: String; ref: 'User' }];
  comments: Comment;
};

export type Comment = {
  userId: string;
  username: string;
  text: string;
  createdAt: string;
};
