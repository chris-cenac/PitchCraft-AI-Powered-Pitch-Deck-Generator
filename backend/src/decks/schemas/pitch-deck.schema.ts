// schemas/pitch-deck.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

// Define the BusinessData schema
@Schema({ _id: false })
export class BusinessData {
  @Prop({ required: true })
  companyName: string;

  @Prop()
  tagline?: string;

  @Prop()
  websiteUrl?: string;

  @Prop()
  logoUrl?: string;

  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  businessStage: string;

  @Prop({ required: true })
  problemStatement: string;

  @Prop({ required: true })
  targetAudience: string;

  @Prop({ required: true })
  proposedSolution: string;

  @Prop({ required: true })
  uniqueValueProposition: string;

  @Prop({ required: true })
  revenueModel: string;

  @Prop({ required: true })
  pricingStrategy: string;

  @Prop({ required: true })
  goToMarketStrategy: string;

  @Prop({ required: true })
  marketSize: string;

  @Prop()
  competitors?: string;

  @Prop({ required: true })
  founders: string;

  @Prop({ required: true })
  teamSize: string;

  @Prop()
  advisors?: string;

  @Prop()
  fundingStage?: string;

  @Prop()
  amountRaised?: string;

  @Prop()
  projectedRevenue?: string;

  @Prop()
  costs?: string;

  @Prop()
  financialMilestones?: string;

  @Prop({ required: true })
  visionStatement: string;

  @Prop({ required: true })
  longTermGoals: string;

  @Prop()
  exitStrategy?: string;

  @Prop({ required: true })
  designStyle: string;

  @Prop()
  brandColors?: string;
}

// Define the Spec schema
@Schema({ _id: false })
export class Spec {
  @Prop({ type: BusinessData, required: true })
  businessData: BusinessData;

  @Prop({ type: [Object], default: [] })
  componentsCatalog?: any[];

  @Prop({ type: [Object], default: [] })
  slides?: any[];

  @Prop({ type: Object })
  theme?: Record<string, any>;
}

@Schema({ timestamps: true })
export class PitchDeck {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Spec, required: true })
  spec: Spec;

  @Prop({
    type: String,
    enum: ["draft", "processing", "completed"],
    default: "draft",
  })
  status: string;

  @Prop({ type: Number, default: 0 })
  progress: number;

  @Prop({ type: Number, default: 0 })
  phase: number;

  @Prop({ type: Object })
  generatedContent?: any;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type PitchDeckDocument = PitchDeck & Document;
export const PitchDeckSchema = SchemaFactory.createForClass(PitchDeck);
