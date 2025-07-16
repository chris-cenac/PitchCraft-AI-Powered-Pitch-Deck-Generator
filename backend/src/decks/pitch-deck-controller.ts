// src/pitch-deck/pitch-deck.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PitchDeckService } from "./pitch-deck-service";
import { CreatePitchDeckDto } from "./dto/create-pitch-deck.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth/jwt-auth.guard";

@Controller("pitch-decks")
@UseGuards(JwtAuthGuard)
export class PitchDeckController {
  constructor(private readonly pitchDeckService: PitchDeckService) {}

  @Post()
  @UseInterceptors(FileInterceptor("logo"))
  async create(
    @Body() createPitchDeckDto: CreatePitchDeckDto,
    @Request() req,
    @UploadedFile() logo?: Express.Multer.File
  ) {
    try {
      let logoUrl: string | null = null;

      if (logo) {
        // Handle logo upload (save to cloud storage or local)
        // logoUrl = await this.fileUploadService.uploadLogo(logo, req.user.id);
      }
      const pitchDeckData = {
        ...createPitchDeckDto,
        ...(logoUrl ? { logoUrl } : {}),
      };

      const pitchDeck = await this.pitchDeckService.create(
        pitchDeckData,
        req.user.id
      );

      return {
        success: true,
        data: pitchDeck,
        message: "Pitch deck created successfully",
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Request() req) {
    const pitchDecks = await this.pitchDeckService.findAllByUser(req.user.id);
    return {
      success: true,
      data: pitchDecks,
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req) {
    const pitchDeck = await this.pitchDeckService.findOne(id, req.user.id);
    return {
      success: true,
      data: pitchDeck,
    };
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("logo"))
  async update(
    @Param("id") id: string,
    @Body() updatePitchDeckDto: Partial<CreatePitchDeckDto>,
    @Request() req,
    @UploadedFile() logo?: Express.Multer.File
  ) {
    let logoUrl: string | null = null;

    if (logo) {
      // Handle logo upload
      // logoUrl = await this.fileUploadService.uploadLogo(logo, req.user.id);
    }

    const updateData = {
      ...updatePitchDeckDto,
      ...(logoUrl ? { logoUrl } : {}),
    };

    const pitchDeck = await this.pitchDeckService.update(
      id,
      updateData,
      req.user.id
    );

    return {
      success: true,
      data: pitchDeck,
      message: "Pitch deck updated successfully",
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Request() req) {
    await this.pitchDeckService.delete(id, req.user.id);
    return {
      success: true,
      message: "Pitch deck deleted successfully",
    };
  }

  @Post(":id/generate")
  async generatePitchDeck(@Param("id") id: string, @Request() req) {
    await this.pitchDeckService.updateStatus(id, "processing", req.user.id);

    // Queue background job for AI processing
    // await this.aiService.generatePitchDeck(id);

    return {
      success: true,
      message: "Pitch deck generation started",
      status: "processing",
    };
  }
}
