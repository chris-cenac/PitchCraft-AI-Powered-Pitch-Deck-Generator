// ai.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Param,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth/jwt-auth.guard";
import { AiService } from "./ai.service";
import { CreatePitchDeckDto } from "./dto/ai.dto";
import { SlideContent } from "./ai.service";
import { PitchDeckService } from "src/decks/pitch-deck-service";
import { ComponentsService } from "./services/components.service";
import { DeckSpec } from "./interfaces/deck-spec.interface";

@Controller("ai")
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly deckService: PitchDeckService,
    private readonly components: ComponentsService
  ) {}

  @Post("pitch-deck/outline")
  async generatePitchDeckOutline(
    @Request() req,
    @Body() dto: CreatePitchDeckDto
  ) {
    try {
      return await this.aiService.generatePitchDeckOutline(dto);
    } catch (error) {
      throw new BadRequestException(
        error.message || "Failed to generate pitch deck outline"
      );
    }
  }

  @Post("pitch-deck/regenerate-slide")
  async regenerateSlide(
    @Request() req,
    @Body("slideContent") slideContent: SlideContent,
    @Body("feedback") feedback: string,
    @Body("companyContext") companyContext: string
  ) {
    try {
      return await this.aiService.regenerateSlide(
        slideContent,
        feedback,
        companyContext
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || "Failed to regenerate slide"
      );
    }
  }

  @Post("pitch-deck/speaker-notes")
  async generateSpeakerNotes(
    @Request() req,
    @Body("slideTitle") slideTitle: string,
    @Body("slideContent") slideContent: string,
    @Body("companyContext") companyContext: string
  ) {
    try {
      const notes = await this.aiService.generateSpeakerNotes(
        slideTitle,
        slideContent,
        companyContext
      );
      return { speakerNotes: notes };
    } catch (error) {
      throw new BadRequestException(
        error.message || "Failed to generate speaker notes"
      );
    }
  }

  @Post("pitch-deck/refine")
  async refineContent(
    @Request() req,
    @Body("content") content: string,
    @Body("instructions") instructions: string
  ) {
    try {
      const refined = await this.aiService.refineContent(content, instructions);
      return { refinedContent: refined };
    } catch (error) {
      throw new BadRequestException(
        error.message || "Failed to refine content"
      );
    }
  }

  @Post("pitch-deck/image-suggestions")
  async generateImageSuggestions(
    @Request() req,
    @Body("slideTitle") slideTitle: string,
    @Body("slideContent") slideContent: string
  ) {
    try {
      const suggestions = await this.aiService.generateImageSuggestions(
        slideTitle,
        slideContent
      );
      return { suggestedImages: suggestions };
    } catch (error) {
      throw new BadRequestException(
        error.message || "Failed to generate image suggestions"
      );
    }
  }

  @Post("deck/:id/generate")
  async generateFullDeck(
    @Param("id") id: string,
    @Request() req
  ): Promise<{ success: boolean; data: DeckSpec }> {
    const deck = await this.deckService.findOne(id, req.user.id);
    if (!deck) throw new NotFoundException("Pitch deck not found");

    const businessData = deck.spec.businessData;
    const catalog = this.components.getAll();

    let generated: DeckSpec;
    try {
      generated = await this.aiService.generateDeck({
        businessData,
        componentsCatalog: catalog,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        "AI generation failed: " + err.message
      );
    }

    // Update the deck with the generated spec
    await this.deckService.updateSpec(id, generated, req.user.id);

    // Return the generated spec directly
    return { success: true, data: generated };
  }
}
