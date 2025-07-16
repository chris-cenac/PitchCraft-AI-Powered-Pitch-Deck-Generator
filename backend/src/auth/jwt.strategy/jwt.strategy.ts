// src/auth/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { AuthService } from "../auth.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER_URL,
      algorithms: ["RS256"],
    });
  }

  // `payload` is the decoded JWT body
  async validate(payload: any) {
    // Upsert to our Users collection
    const user = await this.authService.upsertUser({
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });
    // Return the Mongoose document as `req.user`
    return user;
  }
}
