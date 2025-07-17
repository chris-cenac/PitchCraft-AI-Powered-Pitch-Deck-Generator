import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class FinancialsDto {
  @IsOptional()
  @IsString()
  revenue?: string;

  @IsOptional()
  @IsString()
  funding?: string;

  @IsOptional()
  @IsString()
  projections?: string;

  @IsOptional()
  @IsString()
  costs?: string;

  @IsOptional()
  @IsString()
  financialMilestones?: string;
}

export class CreatePitchDeckDto {
  @IsString()
  companyName: string;

  @IsString()
  industry: string;

  @IsString()
  problemStatement: string;

  @IsString()
  solution: string;

  @IsString()
  businessModel: string;

  @IsString()
  targetMarket: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FinancialsDto)
  financials?: FinancialsDto;

  @IsOptional()
  @IsNumber()
  teamSize?: number;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  businessStage?: string;

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  @IsString()
  uniqueValueProposition?: string;

  @IsOptional()
  @IsString()
  pricingStrategy?: string;

  @IsOptional()
  @IsString()
  goToMarketStrategy?: string;

  @IsOptional()
  @IsString()
  competitors?: string;

  @IsOptional()
  @IsString()
  founders?: string;

  @IsOptional()
  @IsString()
  advisors?: string;

  @IsOptional()
  @IsString()
  fundingStage?: string;

  @IsOptional()
  @IsString()
  amountRaised?: string;

  @IsOptional()
  @IsString()
  visionStatement?: string;

  @IsOptional()
  @IsString()
  longTermGoals?: string;

  @IsOptional()
  @IsString()
  exitStrategy?: string;

  @IsOptional()
  @IsString()
  designStyle?: string;

  @IsOptional()
  @IsString()
  brandColors?: string;

  @IsOptional()
  @IsString()
  additionalInfo?: string;
}

export class ChatMessage {
  @IsString()
  role: "user" | "assistant";

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  timestamp?: string;
}

export class ChatRequestDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  context?: string;

  @IsOptional()
  chatHistory?: ChatMessage[];
}
