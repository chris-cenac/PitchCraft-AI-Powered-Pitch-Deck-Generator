// src/pitch-deck/pitch-deck.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PitchDeckService } from "./pitch-deck-service";
import { PitchDeckController } from "./pitch-deck-controller";
import { PitchDeck, PitchDeckSchema } from "./schemas/pitch-deck.schema";
import { AiModule } from "src/ai/ai.module";
import { TemplateService } from "../ai/services/template.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PitchDeck.name, schema: PitchDeckSchema },
    ]),
    forwardRef(() => AiModule),
  ],
  controllers: [PitchDeckController],
  providers: [PitchDeckService, TemplateService],
  exports: [PitchDeckService],
})
export class PitchDeckModule {}
