// src/models/Timer.ts

import { Schema, model, Document, Types } from 'mongoose';

export interface ITimer extends Document {
  user_id: Types.ObjectId;
  time: number;
  date: Date;
}

const timerSchema = new Schema<ITimer>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default model<ITimer>('Timer', timerSchema);
