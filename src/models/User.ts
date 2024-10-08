// src/models/User.ts

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: boolean; 
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, required: true },
});

export default model<IUser>('User', userSchema);
