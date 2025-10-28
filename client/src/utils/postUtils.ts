import { Post } from 'components/Post/types';

export const filteredAndSortPosts = (
  posts: Post[],
  query: string,
  sort: 'date' | 'likes'
): Post[] => {
  if (!Array.isArray(posts)) return [];

  const lowerQuery = query.toLowerCase();

  let filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(lowerQuery)
  );

  if (sort === 'date') {
    return [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  if (sort === 'likes') {
    return [...filtered].sort((a, b) => b.likes.length - a.likes.length);
  }

  return filtered;
};
