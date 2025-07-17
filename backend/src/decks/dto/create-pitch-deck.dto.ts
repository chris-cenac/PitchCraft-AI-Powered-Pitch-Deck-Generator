import {
  IsObject,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type, Transform } from "class-transformer";

class BusinessDataDto {
  @IsString()
  companyName: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  websiteUrl?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  industry: string;

  @IsString()
  businessStage: string;

  @IsString()
  problemStatement: string;

  @IsString()
  targetAudience: string;

  @IsString()
  proposedSolution: string;

  @IsString()
  uniqueValueProposition: string;

  @IsString()
  revenueModel: string;

  @IsString()
  pricingStrategy: string;

  @IsString()
  goToMarketStrategy: string;

  @IsString()
  marketSize: string;

  @IsString()
  @IsOptional()
  competitors?: string;

  @IsString()
  founders: string;

  @IsString()
  teamSize: string;

  @IsString()
  @IsOptional()
  advisors?: string;

  @IsString()
  @IsOptional()
  fundingStage?: string;

  @IsString()
  @IsOptional()
  amountRaised?: string;

  @IsString()
  @IsOptional()
  projectedRevenue?: string;

  @IsString()
  @IsOptional()
  costs?: string;

  @IsString()
  @IsOptional()
  financialMilestones?: string;

  @IsString()
  visionStatement: string;

  @IsString()
  longTermGoals: string;

  @IsString()
  @IsOptional()
  exitStrategy?: string;

  @IsString()
  designStyle: string;

  @IsString()
  @IsOptional()
  brandColors?: string;
}

// Updated DTO to match frontend structure
export class CreatePitchDeckDto {
  @ValidateNested()
  @Type(() => BusinessDataDto)
  @IsObject()
  businessData: BusinessDataDto;

  @IsArray()
  @IsOptional()
  componentsCatalog?: any[];

  @IsArray()
  @IsOptional()
  slides?: any[];

  @IsObject()
  @IsOptional()
  theme?: Record<string, any>;
}
