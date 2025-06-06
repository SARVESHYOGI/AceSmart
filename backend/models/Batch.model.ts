import { Document, Schema, model, Types } from "mongoose";

export interface IBatch extends Document {
    name: string;                  
    teacherId: Types.ObjectId;
    
    studentIds: Types.ObjectId[];  
  }
  
  const BatchSchema = new Schema<IBatch>({
    name: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  });
  
  export const BatchModel = model<IBatch>('Batch', BatchSchema);
  