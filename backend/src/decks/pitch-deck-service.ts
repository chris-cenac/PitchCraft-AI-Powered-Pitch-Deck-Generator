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
      status: "draft",
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
    status: string,
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
          status: "completed",
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

  async findByStatus(status: string): Promise<PitchDeck[]> {
    return await this.pitchDeckModel.find({ status }).exec();
  }
}
