import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  excerpt: string;
  author: string;
  date: Date;
  likes: number;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, require: true },
  excerpt: { type: String, require: true },
  author: { type: String, require: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

const Post = mongoose.model<IPost>('Post', PostSchema);

async function test() {
  await Post.create({
    title: 'Первый пост',
    excerpt: 'Ура, подключение работает!',
    author: 'System',
  });
  console.log('✅ Пост добавлен!');
  const all = await Post.find();
  console.log('📂 Все посты:', all);
}

test();

export default Post;
