import {
  IsObject,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsEnum,
  IsBoolean,
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

class TemplateDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  slides: string[];

  @IsObject()
  @IsOptional()
  theme?: Record<string, any>;

  @IsArray()
  @IsOptional()
  componentsCatalog?: any[];
}

// Updated DTO to support both business data and template-based creation
export class CreatePitchDeckDto {
  @ValidateNested()
  @Type(() => BusinessDataDto)
  @IsObject()
  @IsOptional()
  businessData?: BusinessDataDto;

  @ValidateNested()
  @Type(() => TemplateDto)
  @IsObject()
  @IsOptional()
  template?: TemplateDto;

  @IsArray()
  @IsOptional()
  componentsCatalog?: any[];

  @IsArray()
  @IsOptional()
  slides?: any[];

  @IsObject()
  @IsOptional()
  theme?: Record<string, any>;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(["ai-generated", "template-based", "custom"])
  @IsOptional()
  deckType?: string;

  @IsBoolean()
  @IsOptional()
  isTemplate?: boolean;

  @IsString()
  @IsOptional()
  parentDeckId?: string;
}
