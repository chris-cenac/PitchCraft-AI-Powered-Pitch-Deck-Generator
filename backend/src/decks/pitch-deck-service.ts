// src/pitch-deck/pitch-deck.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PitchDeck, PitchDeckDocument } from "./schemas/pitch-deck.schema";
import { CreatePitchDeckDto } from "./dto/create-pitch-deck.dto";
import { DeckSpec, Slide } from "src/common/slide-types";
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
  constructor(
    @InjectModel(PitchDeck.name)
    private pitchDeckModel: Model<PitchDeckDocument>
  ) {}

  async create(
    createPitchDeckDto: CreatePitchDeckDto,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = new this.pitchDeckModel({
      ...createPitchDeckDto,
      userId: new Types.ObjectId(userId),
      status: PitchDeckStatus.DRAFT,
    });

    return await pitchDeck.save();
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

  async update(
    id: string,
    updateData: Partial<CreatePitchDeckDto>,
    userId: string
  ): Promise<PitchDeck> {
    const pitchDeck = await this.pitchDeckModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        {
          ...updateData,
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
