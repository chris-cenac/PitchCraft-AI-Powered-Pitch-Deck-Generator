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
import { TemplateService } from "../ai/services/template.service";
import { Response } from "express";
import { Express } from "express";
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
    private readonly componentsService: ComponentsService,
    private readonly templateService: TemplateService
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

  @Get()
  async findAll(@Request() req, @Query() query: any) {
    try {
      const options: any = {};

      if (query.deckType) {
        options.deckType = query.deckType;
      }

      if (query.isTemplate !== undefined) {
        options.isTemplate = query.isTemplate === "true";
      }

      if (query.limit) {
        options.limit = parseInt(query.limit);
      }

      if (query.skip) {
        options.skip = parseInt(query.skip);
      }

      const decks = await this.pitchDeckService.findAll(req.user.id, options);

      return {
        success: true,
        data: decks,
        message: "Decks retrieved successfully",
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || "Failed to retrieve decks"
      );
    }
  }

  @Get("templates")
  async findTemplates(@Request() _req) {
    try {
      // Get hardcoded templates from TemplateService
      const hardcodedTemplates = this.templateService.getAllTemplates();

      // Also get any user-created templates from database
      const dbTemplates = await this.pitchDeckService.findTemplates();

      // Combine both
      const allTemplates = [...hardcodedTemplates, ...dbTemplates];

      return {
        success: true,
        data: allTemplates,
        message: "Templates retrieved successfully",
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || "Failed to retrieve templates"
      );
    }
  }

  @Get("my-templates")
  async findUserTemplates(@Request() req) {
    try {
      const templates = await this.pitchDeckService.findUserTemplates(
        req.user.id
      );

      return {
        success: true,
        data: templates,
        message: "User templates retrieved successfully",
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || "Failed to retrieve user templates"
      );
    }
  }

  @Post()
  async create(@Body() createPitchDeckDto: CreatePitchDeckDto, @Request() req) {
    try {
      // Validate that either businessData or template is provided
      if (!createPitchDeckDto.businessData && !createPitchDeckDto.template) {
        throw new BadRequestException(
          "Either businessData or template must be provided"
        );
      }

      // Validate businessData if provided
      if (createPitchDeckDto.businessData) {
        if (
          typeof createPitchDeckDto.businessData !== "object" ||
          Array.isArray(createPitchDeckDto.businessData)
        ) {
          throw new BadRequestException("businessData must be a plain object");
        }
      }

      // Validate template if provided
      if (createPitchDeckDto.template) {
        if (
          typeof createPitchDeckDto.template !== "object" ||
          Array.isArray(createPitchDeckDto.template)
        ) {
          throw new BadRequestException("template must be a plain object");
        }
      }

      const pitchDeck = await this.pitchDeckService.create(
        createPitchDeckDto,
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

  @Post("from-template/:templateId")
  async createFromTemplate(
    @Param("templateId") templateId: string,
    @Body() customData: any,
    @Request() req
  ) {
    try {
      const pitchDeck = await this.pitchDeckService.createFromTemplate(
        templateId,
        req.user.id,
        customData.businessData
      );

      return {
        success: true,
        data: pitchDeck,
        message: "Pitch deck created from template successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        error.message || "Failed to create pitch deck from template"
      );
    }
  }

  @Post(":id/versions")
  async createVersion(
    @Param("id") id: string,
    @Body() versionData: { spec: any; description?: string },
    @Request() req
  ) {
    try {
      const pitchDeck = await this.pitchDeckService.createVersion(
        id,
        req.user.id,
        versionData.spec,
        versionData.description
      );

      return {
        success: true,
        data: pitchDeck,
        message: "Version created successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        error.message || "Failed to create version"
      );
    }
  }

  @Get(":id/versions/:version")
  async getVersion(
    @Param("id") id: string,
    @Param("version") version: string,
    @Request() req
  ) {
    try {
      const versionData = await this.pitchDeckService.getVersion(
        id,
        parseInt(version),
        req.user.id
      );

      return {
        success: true,
        data: versionData,
        message: "Version retrieved successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        error.message || "Failed to retrieve version"
      );
    }
  }

  @Post(":id/revert/:version")
  async revertToVersion(
    @Param("id") id: string,
    @Param("version") version: string,
    @Request() req
  ) {
    try {
      const pitchDeck = await this.pitchDeckService.revertToVersion(
        id,
        parseInt(version),
        req.user.id
      );

      return {
        success: true,
        data: pitchDeck,
        message: "Reverted to version successfully",
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        error.message || "Failed to revert to version"
      );
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req) {
    try {
      const pitchDeck = await this.pitchDeckService.findOne(id, req.user.id);
      if (!pitchDeck) throw new NotFoundException("Pitch deck not found");

      // Handle edge cases where spec might be null or undefined
      const spec = pitchDeck.spec || {};

      // Return the full spec and title for DeckEditor
      const response = {
        success: true,
        data: {
          slides: spec.slides || [],
          theme: spec.theme || {
            primaryColor: "#2563eb",
            secondaryColor: "#059669",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          title: pitchDeck.title || "Untitled Deck",
        },
      };
      return response;
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

      const logoUrl: string | null = null;

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

  @Patch(":id/title")
  async updateTitle(
    @Param("id") id: string,
    @Body("title") title: string,
    @Request() req
  ) {
    try {
      if (!title || typeof title !== "string") {
        throw new BadRequestException("Title must be a non-empty string");
      }

      const updated = await this.pitchDeckService.updateTitle(
        id,
        title,
        req.user.id
      );

      return { success: true, data: updated };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to update title");
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

      // Get business data
      const businessData = pitchDeck.spec.businessData;

      // Generate the deck using AI service (with fallback info)
      let generatedResult: { deck: DeckSpec; usedFallback: boolean };
      try {
        generatedResult = await this.aiService.generateDeck({
          businessData,
        });
      } catch (err) {
        // Revert status on error
        await this.pitchDeckService.updateStatus(id, "draft", req.user.id);
        throw new InternalServerErrorException(
          err.message || "Failed to generate pitch deck"
        );
      }

      // Update the deck with the generated slides and theme
      await this.pitchDeckService.updateSlides(
        id,
        generatedResult.deck.slides,
        req.user.id
      );
      await this.pitchDeckService.updateTheme(
        id,
        generatedResult.deck.theme,
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
        ...(generatedResult.usedFallback
          ? {
              usedFallback: true,
              message:
                "A fallback deck was generated due to an AI error or incomplete data. Please review and edit your deck as needed.",
            }
          : {}),
        message: "Pitch deck generated successfully",
      };
    } catch (error) {
      // If generation fails, revert status back to draft
      try {
        await this.pitchDeckService.updateStatus(id, "draft", req.user.id);
      } catch {
        // Failed to revert status, but do not throw
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
