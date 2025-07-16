// src/pitch-deck/schemas/pitch-deck.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PitchDeckDocument = PitchDeck & Document;

@Schema({ timestamps: true })
export class PitchDeck {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  // Company Basics
  @Prop({ required: true })
  companyName: string;

  @Prop()
  tagline?: string;

  @Prop()
  websiteUrl?: string;

  @Prop({ required: true })
  industry: string;

  @Prop({
    required: true,
    enum: ["Idea", "MVP", "Revenue", "Growth"],
  })
  businessStage: string;

  @Prop()
  logoUrl?: string;

  // Problem & Solution
  @Prop({ required: true })
  problemStatement: string;

  @Prop({ required: true })
  targetAudience: string;

  @Prop({ required: true })
  proposedSolution: string;

  @Prop({ required: true })
  uniqueValueProposition: string;

  // Business Model & Market
  @Prop({ required: true })
  revenueModel: string;

  @Prop({
    required: true,
    enum: ["Subscription", "Freemium", "One-time", "Tiered"],
  })
  pricingStrategy: string;

  @Prop({ required: true })
  goToMarketStrategy: string;

  @Prop({ required: true })
  marketSize: string;

  @Prop()
  competitors?: string;

  // Team
  @Prop({ required: true })
  founders: string;

  @Prop({ required: true })
  teamSize: string;

  @Prop()
  advisors?: string;

  // Financials
  @Prop({
    enum: ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+"],
  })
  fundingStage?: string;

  @Prop()
  amountRaised?: string;

  @Prop()
  projectedRevenue?: string;

  @Prop()
  costs?: string;

  @Prop()
  financialMilestones?: string;

  // Vision & Goals
  @Prop({ required: true })
  visionStatement: string;

  @Prop({ required: true })
  longTermGoals: string;

  @Prop()
  exitStrategy?: string;

  // Style Preferences
  @Prop({
    required: true,
    enum: ["Minimal", "Bold", "Playful", "Corporate", "Elegant"],
  })
  designStyle: string;

  @Prop()
  brandColors?: string;

  // Status and Processing
  @Prop({ default: "draft" })
  status: string;

  @Prop({ type: Object })
  generatedContent?: any;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PitchDeckSchema = SchemaFactory.createForClass(PitchDeck);

// Add indexes for better query performance
PitchDeckSchema.index({ userId: 1 });
PitchDeckSchema.index({ status: 1 });
PitchDeckSchema.index({ createdAt: -1 });
