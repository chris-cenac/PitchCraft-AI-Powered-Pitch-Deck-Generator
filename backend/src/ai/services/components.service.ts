// src/ai/components.service.ts
import { Injectable } from "@nestjs/common";
import {
  ComponentDefinition,
  COMPONENT_CATALOG,
} from "../data/components.catalog";
@Injectable()
export class ComponentsService {
  getAll(): ComponentDefinition[] {
    return COMPONENT_CATALOG;
  }
}
