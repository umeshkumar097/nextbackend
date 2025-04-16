import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { PdfService } from './pdf.service';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  controllers: [ContractsController],
  providers: [ContractsService, PdfService, CloudinaryService, PrismaService],
})
export class ContractsModule {}
