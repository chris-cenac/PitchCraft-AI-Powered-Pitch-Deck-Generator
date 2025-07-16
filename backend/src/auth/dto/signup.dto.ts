import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string;

  @IsString()
  confirmPassword: string;
}
