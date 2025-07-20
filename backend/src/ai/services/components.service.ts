// src/ai/components.service.ts
import { Injectable } from "@nestjs/common";
import { COMPONENT_NAMES, COMPONENT_GUIDE } from "../data/components.catalog";

@Injectable()
export class ComponentsService {
  getComponentNames(): string[] {
    return COMPONENT_NAMES;
  }

  getComponentGuide(): string {
    return COMPONENT_GUIDE;
  }

  getAll(): { names: string[]; guide: string } {
    return {
      names: COMPONENT_NAMES,
      guide: COMPONENT_GUIDE,
    };
  }
}
