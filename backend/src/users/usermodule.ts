// src/users/users.module.ts

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// 1) Import both the class and the schema from the file above
import { User, UserSchema } from "./schemas/user.schema";

// 2) Import the service & controller you actually use here
import { UsersService } from "./user.service";
import { UsersController } from "./user.controller";

@Module({
  imports: [
    // Register the model under the "User" name
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
