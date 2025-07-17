// src/ai/dto/generate-deck.dto.ts
import { IsObject, IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ComponentDefinitionDto {
  @IsString() name: string;
  @IsObject() props: Record<string, any>;
  @IsObject() layout: {
    columns: number;
    rows?: number;
    columnStart?: number;
    rowStart?: number;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "stretch";
  };
}

export class GenerateDeckDto {
  @IsObject()
  businessData: Record<string, any>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComponentDefinitionDto)
  components: ComponentDefinitionDto[];
}
