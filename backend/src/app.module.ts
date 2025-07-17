import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AiModule } from "./ai/ai.module";
import { AuthModule } from "./auth/auth.module";
import { PitchDeckModule } from "./decks/pitch-deck.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://localhost/nest"
    ),
    AiModule,
    AuthModule,
    PitchDeckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
