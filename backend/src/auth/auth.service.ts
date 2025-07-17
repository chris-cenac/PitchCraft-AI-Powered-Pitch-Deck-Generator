// src/auth/auth.service.ts
import {
  Injectable,
  Logger,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
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
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectModel(AuthUser.name)
    private readonly userModel: Model<AuthUserDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService
  ) {}

  async signupLocal(signupDto: SignupDto): Promise<AuthUserDocument> {
    if (signupDto.password !== signupDto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const existingUser = await this.userModel.findOne({
      email: signupDto.email,
    });
    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(
      signupDto.password,
      this.SALT_ROUNDS
    );

    const newUser = new this.userModel({
      email: signupDto.email,
      password: hashedPassword,
      // Don't set 'sub' field for local users to avoid duplicate key error
    });

    return newUser.save();
  }

  async validateUserLocal(loginDto: LoginDto): Promise<AuthUserDocument> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!user.password) {
      throw new UnauthorizedException("Invalid login method");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }

  async generateAccessToken(user: AuthUserDocument): Promise<string> {
    const payload = {
      sub: user._id.toString(), // Convert ObjectId to string
      email: user.email,
      name: user.name, // Add name to payload
      roles: user.roles || [],
    };

    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const token = new this.refreshTokenModel({
      user: userId,
      token: randomBytes(40).toString("hex"),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Fixed: use 'expiresAt' instead of 'expires'
    });

    await token.save();
    return token.token;
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenDoc = await this.refreshTokenModel.findOne({
      token: refreshToken,
    });

    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.userModel.findById(tokenDoc.user);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.generateAccessToken(user);
  }

  // Password reset functionality (without email)
  async createPasswordResetToken(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const resetToken = randomBytes(20).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.userModel.findByIdAndUpdate(user._id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    return resetToken; // Return token directly to frontend for demo
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
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
    });
  }

  // Existing OAuth functionality
  async upsertUser(payload: {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
  }): Promise<AuthUserDocument> {
    const filter = { sub: payload.sub };
    const update: UpdateQuery<AuthUser> = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      $setOnInsert: { sub: payload.sub },
    };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const user = await this.userModel
      .findOneAndUpdate(filter, update, options)
      .exec();

    if (!user) {
      this.logger.error(`Failed to upsert user with sub=${payload.sub}`);
      throw new Error("Unable to upsert user");
    }

    this.logger.log(`Upserted user ${user.sub}`);
    return user;
  }

  async findUserById(id: string): Promise<AuthUserDocument | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      // Handle invalid ObjectId format
      return null;
    }
  }
  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.refreshTokenModel.deleteOne({ token: refreshToken });
    } catch (error) {
      this.logger.error("Error invalidating refresh token:", error);
      // Don't throw error - logout should still succeed
    }
  }
}
