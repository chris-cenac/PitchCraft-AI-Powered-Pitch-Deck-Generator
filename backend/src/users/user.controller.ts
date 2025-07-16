// src/users/users.controller.ts
import { Controller } from "@nestjs/common";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: add your endpoints, e.g.:
  // @Get()
  // async findAll() {
  //   return this.usersService.findAll();
  // }
}
