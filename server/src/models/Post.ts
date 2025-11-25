import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IComment {
  userId: string;
  username: string;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: Date;
  likes: Types.ObjectId[];
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  authorAvatar: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  comments: [CommentSchema],
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
