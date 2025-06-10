import mongoose,{Schema,model,Document,Types} from "mongoose";

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    PARENT = 'parent',
    SUPERADMIN = 'superadmin',
  }

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    batch?: Types.ObjectId;
    parent?: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, required: true },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch' },
    parent: { type: [Schema.Types.ObjectId], ref: 'User' },
},{timestamps:true})

export const User=model<IUser>("User",UserSchema);