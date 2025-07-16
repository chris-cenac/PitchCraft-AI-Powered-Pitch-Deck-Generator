// src/auth/auth.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy/jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthUser, AuthUserSchema } from "./schemas/user.schema";
import { Role, RoleSchema } from "./schemas/role.schema";
import {
  RefreshToken,
  RefreshTokenSchema,
} from "./schemas/refresh-token.schema";
import { JwtAuthGuard } from "./jwt-auth/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    MongooseModule.forFeature([
      { name: AuthUser.name, schema: AuthUserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>("JWT_SECRET") || "fallback-secret-key",
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN") || "1h",
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard, AuthService],
  controllers: [AuthController],
  exports: [JwtAuthGuard, AuthService, JwtModule],
})
export class AuthModule {}
