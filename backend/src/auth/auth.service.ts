// src/auth/auth.service.ts
import {
  Injectable,
  Logger,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery } from "mongoose";
import { AuthUser, AuthUserDocument } from "./schemas/user.schema";
import {
  RefreshToken,
  RefreshTokenDocument,
} from "./schemas/refresh-token.schema";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/resest-password.dto";
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly SALT_ROUNDS = 12; // Increased from 10 for better security
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  constructor(
    @InjectModel(AuthUser.name)
    private readonly userModel: Model<AuthUserDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService
  ) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): {
    isValid: boolean;
    message?: string;
  } {
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long",
      };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one lowercase letter",
      };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter",
      };
    }
    if (!/(?=.*\d)/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one number",
      };
    }
    return { isValid: true };
  }

  async signupLocal(signupDto: SignupDto): Promise<AuthUserDocument> {
    try {
      // Validate email format
      if (!this.validateEmail(signupDto.email)) {
        throw new BadRequestException("Invalid email format");
      }

      // Validate password strength
      const passwordValidation = this.validatePassword(signupDto.password);
      if (!passwordValidation.isValid) {
        throw new BadRequestException(passwordValidation.message);
      }

      if (signupDto.password !== signupDto.confirmPassword) {
        throw new BadRequestException("Passwords do not match");
      }

      const existingUser = await this.userModel.findOne({
        email: signupDto.email.toLowerCase(),
      });
      if (existingUser) {
        throw new ConflictException("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(
        signupDto.password,
        this.SALT_ROUNDS
      );

      const newUser = new this.userModel({
        email: signupDto.email.toLowerCase(),
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      this.logger.log(`New user registered: ${savedUser.email}`);
      return savedUser;
    } catch (error) {
      this.logger.error(
        `Signup failed for email ${signupDto.email}:`,
        error.message
      );
      throw error;
    }
  }

  async validateUserLocal(loginDto: LoginDto): Promise<AuthUserDocument> {
    try {
      const user = await this.userModel.findOne({
        email: loginDto.email.toLowerCase(),
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (!user.password) {
        throw new UnauthorizedException("Invalid login method");
      }

      // Check for account lockout
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        const remainingTime = Math.ceil(
          (user.lockedUntil.getTime() - Date.now()) / 1000 / 60
        );
        throw new UnauthorizedException(
          `Account temporarily locked. Try again in ${remainingTime} minutes`
        );
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password
      );

      if (!isPasswordValid) {
        // Increment failed login attempts
        const failedAttempts = (user.failedLoginAttempts || 0) + 1;
        const updateData: any = { failedLoginAttempts: failedAttempts };

        if (failedAttempts >= this.MAX_LOGIN_ATTEMPTS) {
          updateData.lockedUntil = new Date(Date.now() + this.LOCKOUT_DURATION);
          updateData.failedLoginAttempts = 0; // Reset after lockout
        }

        await this.userModel.findByIdAndUpdate(user._id, updateData);

        if (failedAttempts >= this.MAX_LOGIN_ATTEMPTS) {
          throw new UnauthorizedException(
            "Too many failed attempts. Account locked for 15 minutes"
          );
        }

        throw new UnauthorizedException("Invalid credentials");
      }

      // Reset failed login attempts on successful login
      if ((user.failedLoginAttempts || 0) > 0) {
        await this.userModel.findByIdAndUpdate(user._id, {
          failedLoginAttempts: 0,
          lockedUntil: null,
        });
      }

      this.logger.log(`User logged in successfully: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error(
        `Login failed for email ${loginDto.email}:`,
        error.message
      );
      throw error;
    }
  }

  async generateAccessToken(user: AuthUserDocument): Promise<string> {
    try {
      const payload = {
        sub: user._id.toString(),
        email: user.email,
        name: user.name,
        roles: user.roles || [],
        iat: Math.floor(Date.now() / 1000),
      };

      return this.jwtService.sign(payload, {
        expiresIn: "7d", // Extended to 7 days for better user experience
      });
    } catch (error) {
      this.logger.error("Failed to generate access token:", error.message);
      throw new InternalServerErrorException("Failed to generate access token");
    }
  }

  async generateRefreshToken(userId: string): Promise<string> {
    try {
      const token = new this.refreshTokenModel({
        user: userId,
        token: randomBytes(40).toString("hex"),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      await token.save();
      return token.token;
    } catch (error) {
      this.logger.error("Failed to generate refresh token:", error.message);
      throw new InternalServerErrorException(
        "Failed to generate refresh token"
      );
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const tokenDoc = await this.refreshTokenModel.findOne({
        token: refreshToken,
      });

      if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
        throw new UnauthorizedException("Invalid or expired refresh token");
      }

      const user = await this.userModel.findById(tokenDoc.user);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      return this.generateAccessToken(user);
    } catch (error) {
      this.logger.error("Failed to refresh access token:", error.message);
      throw error;
    }
  }

  // Password reset functionality (without email)
  async createPasswordResetToken(email: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        email: email.toLowerCase(),
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      const resetToken = randomBytes(20).toString("hex");
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      await this.userModel.findByIdAndUpdate(user._id, {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      });

      this.logger.log(`Password reset token created for: ${user.email}`);
      return resetToken;
    } catch (error) {
      this.logger.error(
        `Failed to create password reset token for ${email}:`,
        error.message
      );
      throw error;
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const passwordValidation = this.validatePassword(
        resetPasswordDto.password
      );
      if (!passwordValidation.isValid) {
        throw new BadRequestException(passwordValidation.message);
      }

      const user = await this.userModel.findOne({
        passwordResetToken: resetPasswordDto.token,
        passwordResetExpires: { $gt: new Date() },
      });

      if (!user) {
        throw new BadRequestException("Invalid or expired token");
      }

      if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
        throw new BadRequestException("Passwords do not match");
      }

      const hashedPassword = await bcrypt.hash(
        resetPasswordDto.password,
        this.SALT_ROUNDS
      );

      await this.userModel.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
        failedLoginAttempts: 0, // Reset failed attempts
        lockedUntil: null, // Unlock account
      });

      this.logger.log(`Password reset successfully for: ${user.email}`);
    } catch (error) {
      this.logger.error("Failed to reset password:", error.message);
      throw error;
    }
  }

  // Existing OAuth functionality
  async upsertUser(payload: {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
  }): Promise<AuthUserDocument> {
    try {
      const filter = { sub: payload.sub };
      const update: UpdateQuery<AuthUser> = {
        email: payload.email.toLowerCase(),
        name: payload.name,
        picture: payload.picture,
        $setOnInsert: { sub: payload.sub },
      };
      const options = { new: true, upsert: true, setDefaultsOnInsert: true };

      const user = await this.userModel
        .findOneAndUpdate(filter, update, options)
        .exec();

      if (!user) {
        throw new Error("Unable to upsert user");
      }

      return user;
    } catch (error) {
      this.logger.error("Failed to upsert user:", error.message);
      throw error;
    }
  }

  async findUserById(id: string): Promise<AuthUserDocument | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      this.logger.error(`Failed to find user by ID ${id}:`, error.message);
      return null;
    }
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.refreshTokenModel.deleteOne({ token: refreshToken });
      this.logger.log("Refresh token invalidated successfully");
    } catch (error) {
      this.logger.error("Failed to invalidate refresh token:", error.message);
      // Don't throw error - logout should still succeed
    }
  }
}
