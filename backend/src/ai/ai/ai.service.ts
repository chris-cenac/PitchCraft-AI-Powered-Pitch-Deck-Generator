import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("OPENAI_API_KEY");
    if (!apiKey) {
      this.logger.error("OPENAI_API_KEY is not defined in .env");
      throw new Error("Missing OPENAI_API_KEY");
    }

    this.openai = new OpenAI({ apiKey });
    this.logger.log("OpenAI client initialized");
  }

  async testCompletion(prompt: string): Promise<string> {
    this.logger.log(`Sending prompt to OpenAI: ${prompt}`);
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    const text = response.choices[0].message.content || "";
    this.logger.log(`Received response from OpenAI: ${text}`);
    return text;
  }
}
