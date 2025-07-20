// src/pitch-deck/pitch-deck.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  PitchDeck,
  PitchDeckDocument,
  BusinessData,
} from "./schemas/pitch-deck.schema";
import { TemplateService } from "../ai/services/template.service";
import { DeckTheme } from "src/common/slide-types";
import * as puppeteer from "puppeteer";

export enum PitchDeckStatus {
  DRAFT = "draft",
  PROCESSING = "processing",
  COMPLETED = "completed",
}

// Unified SlideItem type compatible with both definitions
type UnifiedSlideItem = {
  name: string;
  props: Record<string, any>;
  layout: {
    columns: number;
    rows?: number;
    columnStart?: number;
    rowStart?: number;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "stretch";
  };
};

// Unified Slide type
type UnifiedSlide = {
  id: string;
  title?: string;
  items: UnifiedSlideItem[];
};

// Unified DeckSpec type
type UnifiedDeckSpec = {
  slides: UnifiedSlide[];
  theme: DeckTheme;
};

@Injectable()
export class PitchDeckService {
  private readonly logger = new Logger(PitchDeckService.name);
  constructor(
    @InjectModel(PitchDeck.name)
    private pitchDeckModel: Model<PitchDeckDocument>,
    private templateService: TemplateService
  ) {}

  async create(createPitchDeckDto: any, userId: string): Promise<PitchDeck> {
    try {
      const { businessData, template, ...rest } = createPitchDeckDto;

      // Validate required fields
      if (!businessData && !template) {
        throw new BadRequestException(
          "Either businessData or template must be provided"
        );
      }
      if (
        businessData &&
        (typeof businessData !== "object" || Array.isArray(businessData))
      ) {
        throw new BadRequestException("businessData must be a plain object");
      }
      if (
        template &&
        (typeof template !== "object" || Array.isArray(template))
      ) {
        throw new BadRequestException("template must be a plain object");
      }

      // Determine deck type
      let deckType = "custom";
      if (businessData && !template) {
        deckType = "ai-generated";
      } else if (template && !businessData) {
        deckType = "template-based";
      }

      // Create initial version
      const initialVersion = {
        version: 1,
        createdAt: new Date(),
        spec: {
          businessData,
          template,
          ...rest,
        },
        description: "Initial version",
        createdBy: userId,
      };

      const pitchDeck = new this.pitchDeckModel({
        userId: new Types.ObjectId(userId),
        spec: {
          businessData,
          template,
          ...rest,
        },
        status: "draft",
        currentVersion: 1,
        versions: [initialVersion],
        deckType,
        title: businessData?.companyName || template?.name || "Untitled Deck",
        description: businessData?.tagline || template?.description,
        isTemplate: createPitchDeckDto.isTemplate || false,
        parentDeckId: createPitchDeckDto.parentDeckId,
      });

      return pitchDeck.save();
    } catch (err) {
      this.logger.error("Error creating pitch deck:", err);
      if (err instanceof BadRequestException) throw err;
      throw new BadRequestException(
        err.message || "Failed to create pitch deck"
      );
    }
  }

  async createFromTemplate(
    templateId: string,
    userId: string,
    customData?: Partial<BusinessData>
  ): Promise<PitchDeck> {
    try {
      // Get template data (this would come from your template service)
      const template = await this.getTemplateById(templateId);
      if (!template) {
        throw new NotFoundException("Template not found");
      }

      // Generate the actual deck content from the template
      const generatedDeck = template.generateDeck
        ? template.generateDeck()
        : {
            slides: [],
            theme: template.theme || {},
          };

      // Create deck from template
      const createDto = {
        template: {
          id: template.id,
          name: template.name,
          category: template.category,
          description: template.description,
          slides: template.slides,
          theme: template.theme,
          componentsCatalog: template.componentsCatalog,
        },
        businessData: customData,
        slides: generatedDeck.slides || [],
        theme: generatedDeck.theme || template.theme || {},
        deckType: "template-based",
        title: customData?.companyName || template.name,
        description: customData?.tagline || template.description,
        parentDeckId: templateId,
      };

      return this.create(createDto, userId);
    } catch (err) {
      this.logger.error("Error creating deck from template:", err);
      if (err instanceof NotFoundException) throw err;
      throw new BadRequestException(
        err.message || "Failed to create deck from template"
      );
    }
  }

  async createVersion(
    id: string,
    userId: string,
    spec: any,
    description?: string
  ): Promise<PitchDeck> {
    try {
      const pitchDeck = await this.findOne(id, userId);
      if (!pitchDeck) {
        throw new NotFoundException("Pitch deck not found");
      }

      const newVersion = pitchDeck.currentVersion + 1;
      const version = {
        version: newVersion,
        createdAt: new Date(),
        spec,
        description: description || `Version ${newVersion}`,
        createdBy: userId,
      };

      // Add new version to versions array and update
      const updatedDeck = await this.pitchDeckModel
        .findOneAndUpdate(
          {
            _id: new Types.ObjectId(id),
            userId: new Types.ObjectId(userId),
          },
          {
            $push: { versions: version },
            $set: {
              currentVersion: newVersion,
              spec,
              updatedAt: new Date(),
            },
          },
          { new: true }
        )
        .exec();

      if (!updatedDeck) {
        throw new NotFoundException("Pitch deck not found");
      }

      return updatedDeck;
    } catch (err) {
      this.logger.error("Error creating version:", err);
      if (err instanceof NotFoundException) throw err;
      throw new BadRequestException(err.message || "Failed to create version");
    }
  }

  async getVersion(id: string, version: number, userId: string): Promise<any> {
    const pitchDeck = await this.findOne(id, userId);
    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    const versionData = pitchDeck.versions.find((v) => v.version === version);
    if (!versionData) {
      throw new NotFoundException("Version not found");
    }

    return versionData;
  }

  async revertToVersion(
    id: string,
    version: number,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.findOne(id, userId);
    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    const versionData = pitchDeck.versions.find((v) => v.version === version);
    if (!versionData) {
      throw new NotFoundException("Version not found");
    }

    // Create new version with reverted spec
    const newVersion = pitchDeck.currentVersion + 1;
    const revertVersion = {
      version: newVersion,
      createdAt: new Date(),
      spec: versionData.spec,
      description: `Reverted to version ${version}`,
      createdBy: userId,
    };

    const updatedDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          $push: { versions: revertVersion },
          $set: {
            currentVersion: newVersion,
            spec: versionData.spec,
            updatedAt: new Date(),
          },
        },
        { new: true }
      )
      .exec();

    if (!updatedDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return updatedDeck;
  }

  async findAll(
    userId: string,
    options?: {
      deckType?: string;
      isTemplate?: boolean;
      limit?: number;
      skip?: number;
    }
  ): Promise<PitchDeck[]> {
    const query: any = { userId: new Types.ObjectId(userId) };

    if (options?.deckType) {
      query.deckType = options.deckType;
    }

    if (options?.isTemplate !== undefined) {
      query.isTemplate = options.isTemplate;
    }

    let queryBuilder = this.pitchDeckModel.find(query).sort({ updatedAt: -1 });

    if (options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit);
    }

    if (options?.skip) {
      queryBuilder = queryBuilder.skip(options.skip);
    }

    return queryBuilder.exec();
  }

  async findTemplates(): Promise<PitchDeck[]> {
    return this.pitchDeckModel
      .find({ isTemplate: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findUserTemplates(userId: string): Promise<PitchDeck[]> {
    return this.pitchDeckModel
      .find({ userId: new Types.ObjectId(userId), isTemplate: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(
    id: string,
    updatePitchDeckDto: any,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.findOne(id, userId);
    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    // Create new version if there are significant changes
    const hasSignificantChanges = this.hasSignificantChanges(
      pitchDeck.spec,
      updatePitchDeckDto
    );

    const updateData: any = {
      spec: { ...pitchDeck.spec, ...updatePitchDeckDto },
      updatedAt: new Date(),
    };

    if (updatePitchDeckDto.title) {
      updateData.title = updatePitchDeckDto.title;
    }
    if (updatePitchDeckDto.description) {
      updateData.description = updatePitchDeckDto.description;
    }

    if (hasSignificantChanges) {
      const newVersion = pitchDeck.currentVersion + 1;
      const version = {
        version: newVersion,
        createdAt: new Date(),
        spec: updatePitchDeckDto,
        description: "Updated version",
        createdBy: userId,
      };

      updateData.$push = { versions: version };
      updateData.currentVersion = newVersion;
    }

    const updatedDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        updateData,
        { new: true }
      )
      .exec();

    if (!updatedDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return updatedDeck;
  }

  private hasSignificantChanges(currentSpec: any, newSpec: any): boolean {
    // Compare slides, theme, and business data for significant changes
    const currentSlides = JSON.stringify(currentSpec.slides || []);
    const newSlides = JSON.stringify(newSpec.slides || []);

    const currentTheme = JSON.stringify(currentSpec.theme || {});
    const newTheme = JSON.stringify(newSpec.theme || {});

    const currentBusinessData = JSON.stringify(currentSpec.businessData || {});
    const newBusinessData = JSON.stringify(newSpec.businessData || {});

    return (
      currentSlides !== newSlides ||
      currentTheme !== newTheme ||
      currentBusinessData !== newBusinessData
    );
  }

  private async getTemplateById(templateId: string): Promise<any> {
    return this.templateService.getTemplateById(templateId);
  }

  async findAllByUser(userId: string): Promise<PitchDeck[]> {
    return await this.pitchDeckModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async updateStatus(
    id: string,
    status: PitchDeckStatus | string,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          status,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async updateSlides(
    id: string,
    slides: UnifiedSlide[],
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          $set: { "spec.slides": slides, updatedAt: new Date() },
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async updateTheme(
    id: string,
    theme: DeckTheme | Record<string, any>,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          $set: { "spec.theme": theme, updatedAt: new Date() },
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async updateTitle(
    id: string,
    title: string,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          $set: { title, updatedAt: new Date() },
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async updateBusinessData(
    id: string,
    businessData: Record<string, any>,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          businessData,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async updateComponentsCatalog(
    id: string,
    componentsCatalog: any[],
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          componentsCatalog,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async saveGeneratedContent(
    id: string,
    content: any,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          generatedContent: content,
          status: PitchDeckStatus.COMPLETED,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.pitchDeckModel
      .deleteOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException("Pitch deck not found");
    }
  }

  async findByStatus(status: PitchDeckStatus): Promise<PitchDeck[]> {
    return await this.pitchDeckModel.find({ status }).exec();
  }

  async getGenerationStatus(
    id: string,
    userId: string
  ): Promise<{
    status: string;
    percent: number;
    phase: number;
    error?: string;
  }> {
    const pitchDeck = await this.pitchDeckModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .select("status progress phase")
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return {
      status: pitchDeck.status,
      percent: pitchDeck.progress ?? 0,
      phase: pitchDeck.phase ?? 0,
    };
  }

  // Deprecated: Use updateSlides and updateTheme instead
  async updateSpec(
    id: string,
    newSpec: UnifiedDeckSpec,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          slides: newSpec.slides,
          theme: newSpec.theme,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async generatePitchDeck(id: string, userId: string): Promise<PitchDeck> {
    // First, verify the pitch deck exists and belongs to the user
    const pitchDeck = await this.findOne(id, userId);

    // Validate that businessData exists
    if (!pitchDeck.spec?.businessData) {
      throw new BadRequestException("Business data is missing from pitch deck");
    }

    // Update status to processing
    await this.updateStatus(id, PitchDeckStatus.PROCESSING, userId);

    try {
      // The actual AI generation logic is handled by the controller
      // This method just manages the status and database updates
      // The controller's generatePitchDeck method will:
      // 1. Call aiService.generateDeck() with businessData and componentsCatalog
      // 2. Update the deck slides and theme using updateSlides() and updateTheme()

      // Return the pitch deck with processing status
      // The controller will handle updating the slides and theme
      return await this.findOne(id, userId);
    } catch (error) {
      // If generation fails, revert status back to draft
      await this.updateStatus(id, PitchDeckStatus.DRAFT, userId);
      throw error;
    }
  }

  async updateProgressPhase(
    id: string,
    progress: number,
    phase: number,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          progress,
          phase,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();

    if (!pitchDeck) {
      throw new NotFoundException("Pitch deck not found");
    }

    return pitchDeck;
  }

  async generatePdfFromHtml(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    return pdfBuffer;
  }
}
