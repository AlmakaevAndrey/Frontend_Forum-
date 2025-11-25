import mongoose, { Schema, Types } from 'mongoose';

export interface IMeme extends Document {
  _id: string;
  imgURL: string;
  author: string;
  authorAvatar?: string;
  likes: Types.ObjectId[];
  date: Date;
}

const MemeSchema = new Schema<IMeme>({
  imgURL: { type: String, required: true },
  author: { type: String, required: true },
  authorAvatar: { type: String, required: false },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  date: { type: Date, default: Date.now },
});

const Meme = mongoose.model<IMeme>('Meme', MemeSchema);

export default Meme;
