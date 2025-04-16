import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('match')
  async match(@Query('q') q: string) {
    return this.aiService.matchSpeakers(q);
  }
}
