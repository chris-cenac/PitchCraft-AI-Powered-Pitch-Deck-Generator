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
  InternalServerErrorException,
  NotFoundException,
  Query,
  Res,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth/jwt-auth.guard";
import { PitchDeckService } from "./pitch-deck-service";
import { CreatePitchDeckDto } from "./dto/create-pitch-deck.dto";
import { DeckSpec } from "../ai/interfaces/deck-spec.interface";
import { AiService } from "../ai/ai.service";
import { ComponentsService } from "../ai/services/components.service";
import { Response } from "express";
import { Public } from "../auth/decorators/public.decorator";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Controller("pitch-decks")
@UseGuards(JwtAuthGuard)
export class PitchDeckController {
  constructor(
    private readonly pitchDeckService: PitchDeckService,
    private readonly aiService: AiService,
    private readonly componentsService: ComponentsService
  ) {}

  /**
   * Helper to ensure a value is a plain object, parsing JSON if needed.
   */
  private ensureObject<T = any>(value: any, label = "value"): T {
    if (!value) throw new BadRequestException(`${label} is required`);
    if (typeof value === "object" && !Array.isArray(value)) return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
        throw new Error();
      } catch {
        throw new BadRequestException(
          `${label} must be a valid JSON object string`
        );
      }
    }
    throw new BadRequestException(`${label} must be an object`);
  }

  @Post()
  async create(@Body() createPitchDeckDto: CreatePitchDeckDto, @Request() req) {
    try {
      // Validate businessData
      if (
        !createPitchDeckDto.businessData ||
        typeof createPitchDeckDto.businessData !== "object" ||
        Array.isArray(createPitchDeckDto.businessData)
      ) {
        throw new BadRequestException("businessData must be a plain object");
      }

      const pitchDeck = await this.pitchDeckService.create(
        {
          spec: {
            businessData: createPitchDeckDto.businessData,
            componentsCatalog: createPitchDeckDto.componentsCatalog,
            slides: createPitchDeckDto.slides,
            theme: createPitchDeckDto.theme,
          },
          status: "draft",
        } as any,
        req.user.id
      );

      return {
        success: true,
        data: pitchDeck,
        message: "Pitch deck created successfully",
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      if (error instanceof SyntaxError) {
        throw new BadRequestException("Invalid JSON format in request fields");
      }
      throw new InternalServerErrorException(
        error.message || "Failed to create pitch deck"
      );
    }
  }

  @Get()
  async findAll(@Request() req) {
    try {
      const pitchDecks = await this.pitchDeckService.findAllByUser(req.user.id);
      return { success: true, data: pitchDecks };
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch pitch decks");
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req) {
    try {
      const pitchDeck = await this.pitchDeckService.findOne(id, req.user.id);
      if (!pitchDeck) throw new NotFoundException("Pitch deck not found");
      // Only return slides and theme for DeckEditor
      const { slides, theme } = pitchDeck.spec || {};
      return { success: true, data: { slides, theme } };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Failed to fetch pitch deck");
    }
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("logo"))
  async update(
    @Param("id") id: string,
    @Body() updatePitchDeckDto: Partial<CreatePitchDeckDto>,
    @Request() req,
    @UploadedFile() logo?: Express.Multer.File
  ) {
    try {
      // Parse spec if it's a string (from FormData)
      const dtoWithSpec = updatePitchDeckDto as any;
      if (dtoWithSpec.spec && typeof dtoWithSpec.spec === "string") {
        dtoWithSpec.spec = JSON.parse(dtoWithSpec.spec);
      }
      // Unwrap spec if present
      if (dtoWithSpec.spec) {
        const { businessData, componentsCatalog, slides, theme } =
          dtoWithSpec.spec;
        updatePitchDeckDto.businessData = businessData;
        updatePitchDeckDto.componentsCatalog = componentsCatalog;
        updatePitchDeckDto.slides = slides;
        updatePitchDeckDto.theme = theme;
      }
      if (
        updatePitchDeckDto.businessData &&
        typeof updatePitchDeckDto.businessData !== "object"
      ) {
        throw new BadRequestException("businessData must be an object");
      }
      if (
        updatePitchDeckDto.businessData &&
        typeof updatePitchDeckDto.businessData === "string"
      ) {
        updatePitchDeckDto.businessData = JSON.parse(
          updatePitchDeckDto.businessData
        );
      }

      // Parse slides if it's a string
      if (
        updatePitchDeckDto.slides &&
        typeof updatePitchDeckDto.slides === "string"
      ) {
        updatePitchDeckDto.slides = JSON.parse(updatePitchDeckDto.slides);
      }

      // Parse theme if it's a string
      if (
        updatePitchDeckDto.theme &&
        typeof updatePitchDeckDto.theme === "string"
      ) {
        updatePitchDeckDto.theme = JSON.parse(updatePitchDeckDto.theme);
      }

      // Parse componentsCatalog if it's a string
      if (
        updatePitchDeckDto.componentsCatalog &&
        typeof updatePitchDeckDto.componentsCatalog === "string"
      ) {
        updatePitchDeckDto.componentsCatalog = JSON.parse(
          updatePitchDeckDto.componentsCatalog
        );
      }

      let logoUrl: string | null = null;

      if (logo) {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(logo.mimetype)) {
          throw new BadRequestException("Invalid file type.");
        }
        const maxSize = 5 * 1024 * 1024;
        if (logo.size > maxSize) {
          throw new BadRequestException("File size too large.");
        }
        // logoUrl = await this.fileUploadService.uploadLogo(logo, req.user.id);
      }

      // Prepare update data
      const updateData: any = {};

      if (updatePitchDeckDto.businessData) {
        updateData.businessData = {
          ...updatePitchDeckDto.businessData,
          ...(logoUrl ? { logoUrl } : {}),
        };
      }

      if (updatePitchDeckDto.slides) {
        updateData.slides = updatePitchDeckDto.slides;
      }

      if (updatePitchDeckDto.theme) {
        updateData.theme = updatePitchDeckDto.theme;
      }

      if (updatePitchDeckDto.componentsCatalog) {
        updateData.componentsCatalog = updatePitchDeckDto.componentsCatalog;
      }

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
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException("Invalid JSON format in request fields");
      }
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to update pitch deck");
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Request() req) {
    try {
      await this.pitchDeckService.delete(id, req.user.id);
      return {
        success: true,
        message: "Pitch deck deleted successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Failed to delete pitch deck");
    }
  }

  @Patch(":id/slides")
  async updateSlides(
    @Param("id") id: string,
    @Body("slides") slides: any[],
    @Request() req
  ) {
    try {
      // Parse slides if it's a string
      if (typeof slides === "string") {
        slides = JSON.parse(slides);
      }

      const updated = await this.pitchDeckService.updateSlides(
        id,
        slides,
        req.user.id
      );
      return { success: true, data: updated };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException("Invalid JSON format in slides field");
      }
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Failed to update slides");
    }
  }

  @Patch(":id/theme")
  async updateTheme(
    @Param("id") id: string,
    @Body("theme") theme: Record<string, any>,
    @Request() req
  ) {
    try {
      // Parse theme if it's a string
      if (typeof theme === "string") {
        theme = JSON.parse(theme);
      }

      const updated = await this.pitchDeckService.updateTheme(
        id,
        theme,
        req.user.id
      );
      return { success: true, data: updated };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException("Invalid JSON format in theme field");
      }
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Failed to update theme");
    }
  }

  @Get(":id/status")
  async getGenerationStatus(@Param("id") id: string, @Request() req) {
    try {
      const status = await this.pitchDeckService.getGenerationStatus(
        id,
        req.user.id
      );
      return { success: true, data: status };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Failed to get generation status");
    }
  }

  @Post(":id/generate")
  async generatePitchDeck(@Param("id") id: string, @Request() req) {
    try {
      // First verify the deck exists and update status to processing
      const pitchDeck = await this.pitchDeckService.findOne(id, req.user.id);
      if (!pitchDeck) throw new NotFoundException("Pitch deck not found");

      // Validate that businessData exists
      if (!pitchDeck.spec?.businessData) {
        throw new BadRequestException(
          "Business data is missing from pitch deck"
        );
      }

      // Update status to processing and phase to 0 (Uploading)
      await this.pitchDeckService.updateStatus(id, "processing", req.user.id);
      await this.pitchDeckService.updateProgressPhase(id, 5, 0, req.user.id); // Uploading
      await sleep(700);

      // Simulate Analyzing Inputs
      await this.pitchDeckService.updateProgressPhase(id, 20, 1, req.user.id); // Analyzing
      await sleep(700);

      // Simulate Designing Slides
      await this.pitchDeckService.updateProgressPhase(id, 40, 2, req.user.id); // Designing
      await sleep(700);

      // Simulate Generating Content
      await this.pitchDeckService.updateProgressPhase(id, 60, 3, req.user.id); // Generating
      await sleep(700);

      // Simulate Finalizing Deck
      await this.pitchDeckService.updateProgressPhase(id, 80, 4, req.user.id); // Finalizing
      await sleep(700);

      // Get business data and components catalog
      const businessData = pitchDeck.spec.businessData;
      const catalog = this.componentsService.getAll();

      // Generate the deck using AI service
      const generatedSpec: DeckSpec = await this.aiService.generateDeck({
        businessData,
        componentsCatalog: catalog,
      });

      // Update the deck with the generated slides and theme
      await this.pitchDeckService.updateSlides(
        id,
        generatedSpec.slides,
        req.user.id
      );
      await this.pitchDeckService.updateTheme(
        id,
        generatedSpec.theme,
        req.user.id
      );

      // Update status to completed and progress/phase to 100/5 (Completed)
      await this.pitchDeckService.updateStatus(id, "completed", req.user.id);
      await this.pitchDeckService.updateProgressPhase(id, 100, 5, req.user.id);

      // Return the updated pitch deck
      const updatedPitchDeck = await this.pitchDeckService.findOne(
        id,
        req.user.id
      );

      return {
        success: true,
        data: updatedPitchDeck,
        message: "Pitch deck generated successfully",
      };
    } catch (error) {
      // If generation fails, revert status back to draft
      try {
        await this.pitchDeckService.updateStatus(id, "draft", req.user.id);
      } catch (statusError) {
        // Log but don't throw - the main error is more important
        console.error("Failed to revert status:", statusError);
      }

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || "Failed to generate pitch deck"
      );
    }
  }

  @Public()
  @Post("pdf")
  async generatePdf(@Body("html") html: string, @Res() res: Response) {
    if (!html) {
      return res.status(400).json({ error: "Missing HTML content" });
    }
    const pdfBuffer = await this.pitchDeckService.generatePdfFromHtml(html);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="deck.pdf"',
    });
    res.send(pdfBuffer);
  }
}
