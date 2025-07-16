// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/resest-password.dto";
import { JwtAuthGuard } from "./jwt-auth/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const user = await this.authService.signupLocal(signupDto);

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: "User created successfully",
        data: {
          id: user.id, // Use .id instead of ._id
          email: user.email,
        },
      });
    } catch (error) {
      const status = error.status || HttpStatus.BAD_REQUEST;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Bad Request",
      });
    }
  }

  @Post("login")
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.validateUserLocal(loginDto);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(
        user.id // Use .id instead of ._id.toString()
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Login successful",
        data: {
          user: {
            id: user.id, // Use .id instead of ._id
            email: user.email,
            name: user.name,
            roles: user.roles,
          },
          tokens: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      const status = error.status || HttpStatus.UNAUTHORIZED;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Unauthorized",
      });
    }
  }

  @Post("refresh")
  @UsePipes(new ValidationPipe({ transform: true }))
  async refreshToken(
    @Body("refreshToken") refreshToken: string,
    @Res() res: Response
  ) {
    try {
      const accessToken =
        await this.authService.refreshAccessToken(refreshToken);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Token refreshed successfully",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      const status = error.status || HttpStatus.UNAUTHORIZED;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Unauthorized",
      });
    }
  }

  @Post("forgot-password")
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgotPassword(@Body("email") email: string, @Res() res: Response) {
    try {
      const resetToken = await this.authService.createPasswordResetToken(email);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Password reset token created",
        data: {
          resetToken, // In production, this would be sent via email
        },
      });
    } catch (error) {
      const status = error.status || HttpStatus.BAD_REQUEST;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Bad Request",
      });
    }
  }

  @Post("reset-password")
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response
  ) {
    try {
      await this.authService.resetPassword(resetPasswordDto);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Password reset successfully",
      });
    } catch (error) {
      const status = error.status || HttpStatus.BAD_REQUEST;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Bad Request",
      });
    }
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req, @Res() res: Response) {
    try {
      const user = await this.authService.findUserById(req.user.sub);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Profile retrieved successfully",
        data: {
          user: {
            id: user?.id, // Use .id instead of ._id
            email: user?.email,
            name: user?.name,
            roles: user?.roles,
          },
        },
      });
    } catch (error) {
      const status = error.status || HttpStatus.BAD_REQUEST;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Bad Request",
      });
    }
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async logout(
    @Body("refreshToken") refreshToken: string,
    @Res() res: Response
  ) {
    try {
      // In a real app, you'd invalidate the refresh token here
      // For now, just return success
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Logged out successfully",
      });
    } catch (error) {
      const status = error.status || HttpStatus.BAD_REQUEST;
      return res.status(status).json({
        statusCode: status,
        message: error.message,
        error: error.name || "Bad Request",
      });
    }
  }
}
