// src/common/services/file-upload.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Express } from "express";

@Injectable()
export class FileUploadService {
  constructor(private configService: ConfigService) {}

  async uploadLogo(file: Express.Multer.File, userId: string): Promise<string> {
    if (!file) {
      throw new BadRequestException("No file provided");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        "File size too large. Maximum size is 5MB."
      );
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const filename = `${userId}-${uuidv4()}${fileExtension}`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "uploads", "logos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);

    // Return URL or path
    return `/uploads/logos/${filename}`;
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch {
      // Error deleting file, but do not throw
    }
  }
}
