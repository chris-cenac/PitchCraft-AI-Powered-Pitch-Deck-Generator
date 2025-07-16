// src/pitch-deck/pitch-deck.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PitchDeckService } from "./pitch-deck-service";
import { PitchDeckController } from "./pitch-deck-controller";
import { PitchDeck, PitchDeckSchema } from "./schemas/pitch-deck.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PitchDeck.name, schema: PitchDeckSchema },
    ]),
  ],
  controllers: [PitchDeckController],
  providers: [PitchDeckService],
  exports: [PitchDeckService],
})
export class PitchDeckModule {}
