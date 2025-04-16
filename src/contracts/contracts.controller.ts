// 📍 Location: src/contracts/contracts.controller.ts
import { Controller, Post, Req, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Request } from 'express';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Post(':bookingId')
  async generate(@Param('bookingId') id: string, @Req() req: Request) {
    return this.service.generateAndUploadContract(id, req.user.uid);
  }
}
