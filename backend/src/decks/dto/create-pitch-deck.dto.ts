// src/pitch-deck/dto/create-pitch-deck.dto.ts
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumberString,
  IsUrl,
} from "class-validator";

export enum BusinessStage {
  IDEA = "Idea",
  MVP = "MVP",
  REVENUE = "Revenue",
  GROWTH = "Growth",
}

export enum PricingStrategy {
  SUBSCRIPTION = "Subscription",
  FREEMIUM = "Freemium",
  ONE_TIME = "One-time",
  TIERED = "Tiered",
}

export enum FundingStage {
  BOOTSTRAPPED = "Bootstrapped",
  PRE_SEED = "Pre-seed",
  SEED = "Seed",
  SERIES_A = "Series A",
  SERIES_B_PLUS = "Series B+",
}

export enum DesignStyle {
  MINIMAL = "Minimal",
  BOLD = "Bold",
  PLAYFUL = "Playful",
  CORPORATE = "Corporate",
  ELEGANT = "Elegant",
}

export class CreatePitchDeckDto {
  // Step 1: Company Basics
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @IsString()
  industry: string;

  @IsEnum(BusinessStage)
  businessStage: BusinessStage;

  // Step 2: Problem & Solution
  @IsString()
  problemStatement: string;

  @IsString()
  targetAudience: string;

  @IsString()
  proposedSolution: string;

  @IsString()
  uniqueValueProposition: string;

  // Step 3: Business Model & Market
  @IsString()
  revenueModel: string;

  @IsEnum(PricingStrategy)
  pricingStrategy: PricingStrategy;

  @IsString()
  goToMarketStrategy: string;

  @IsString()
  marketSize: string;

  @IsOptional()
  @IsString()
  competitors?: string;

  // Step 4: Team
  @IsString()
  founders: string;

  @IsNumberString()
  teamSize: string;

  @IsOptional()
  @IsString()
  advisors?: string;

  // Step 5: Financials
  @IsOptional()
  @IsEnum(FundingStage)
  fundingStage?: FundingStage;

  @IsOptional()
  @IsString()
  amountRaised?: string;

  @IsOptional()
  @IsString()
  projectedRevenue?: string;

  @IsOptional()
  @IsString()
  costs?: string;

  @IsOptional()
  @IsString()
  financialMilestones?: string;

  // Step 6: Vision & Goals
  @IsString()
  visionStatement: string;

  @IsString()
  longTermGoals: string;

  @IsOptional()
  @IsString()
  exitStrategy?: string;

  // Step 7: Style Preferences
  @IsEnum(DesignStyle)
  designStyle: DesignStyle;

  @IsOptional()
  @IsString()
  brandColors?: string;
}
