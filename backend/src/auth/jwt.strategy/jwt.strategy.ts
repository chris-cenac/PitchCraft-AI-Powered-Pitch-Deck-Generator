// src/auth/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";

export interface JwtPayload {
  sub: string; // user id (MongoDB ObjectId as string)
  email: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>("JWT_SECRET") || "fallback-secret-key",
    });
  }

  async validate(payload: JwtPayload) {
    // Validate that the user still exists in the database
    const user = await this.authService.findUserById(payload.sub);

    if (!user) {
      return null; // This will result in 401 Unauthorized
    }

    // Return user object that will be attached to req.user
    return {
      id: user._id.toString(),
      sub: payload.sub, // Keep sub for compatibility
      email: user.email,
      name: user.name,
      roles: user.roles || [],
    };
  }
}
