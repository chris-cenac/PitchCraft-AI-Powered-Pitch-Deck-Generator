import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AiModule } from "./ai/ai.module";
import { AuthModule } from "./auth/auth.module";
import { PitchDeckModule } from "./decks/pitch-deck.module";
import appConfig from "./common/config/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || "mongodb://localhost/nest",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    AiModule,
    AuthModule,
    PitchDeckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
