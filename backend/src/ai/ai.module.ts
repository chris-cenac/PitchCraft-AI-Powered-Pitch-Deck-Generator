// src/ai/ai.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { ComponentsService } from "./services/components.service";
import { PitchDeckModule } from "src/decks/pitch-deck.module";

@Module({
  imports: [ConfigModule, forwardRef(() => PitchDeckModule)],
  controllers: [AiController],
  providers: [AiService, ComponentsService],
  exports: [AiService, ComponentsService],
})
export class AiModule {}
