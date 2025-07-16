// src/auth/dto/reset-password.dto.ts
import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
