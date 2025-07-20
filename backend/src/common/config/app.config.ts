import { registerAs } from "@nestjs/config";

export interface AppConfig {
  port: number;
  nodeEnv: string;
  database: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
  openai: {
    apiKey: string;
  };
  cors: {
    allowedOrigins: string[];
  };
  security: {
    bcryptSaltRounds: number;
    maxLoginAttempts: number;
    lockoutDuration: number;
  };
  logging: {
    level: string;
  };
}

export default registerAs("app", (): AppConfig => {
  const requiredEnvVars = ["JWT_SECRET", "MONGODB_URI", "OPENAI_API_KEY"];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  return {
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    database: {
      uri: process.env.MONGODB_URI!,
    },
    jwt: {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY!,
    },
    cors: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
        "https://chriscenac.dev",
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
      ],
    },
    security: {
      bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10),
      maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5", 10),
      lockoutDuration: parseInt(process.env.LOCKOUT_DURATION || "900000", 10), // 15 minutes in ms
    },
    logging: {
      level: process.env.LOG_LEVEL || "info",
    },
  };
});
