import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;
}

// 2) Export the schema factory
export const UserSchema = SchemaFactory.createForClass(User);
