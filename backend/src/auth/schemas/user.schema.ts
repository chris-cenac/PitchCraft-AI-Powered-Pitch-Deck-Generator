// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AuthUserDocument = AuthUser &
  Document & {
    _id: Types.ObjectId;
  };

@Schema({
  timestamps: true,
})
export class AuthUser {
  @Prop({ unique: true, sparse: true })
  sub?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  name?: string;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop()
  picture?: string;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetExpires?: Date;

  @Prop({ type: Number, default: 0 })
  failedLoginAttempts?: number;

  @Prop()
  lockedUntil?: Date;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);

AuthUserSchema.index({ email: 1 }, { unique: true });
AuthUserSchema.index({ sub: 1 }, { unique: true, sparse: true });
AuthUserSchema.index({ lockedUntil: 1 }, { expireAfterSeconds: 0 }); // TTL index for automatic cleanup
