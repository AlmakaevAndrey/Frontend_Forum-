import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  excerpt: string;
  author: string;
  date: Date;
  likes: number;
}

const PostSchema = new Schema<IPost>({
  id: { type: String, require: true },
  title: { type: String, require: true },
  excerpt: { type: String, require: true },
  author: { type: String, require: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

export default mongoose.model<IPost>('Post', PostSchema);
