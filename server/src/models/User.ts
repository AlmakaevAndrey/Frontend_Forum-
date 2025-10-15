import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export type Role = 'admin' | 'user' | 'guest';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'guest'], default: 'user' },
  avatar: { type: String, default: '' },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
