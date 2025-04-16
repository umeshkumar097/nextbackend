// src/bookings/booking.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto, userId: string) {
    return await this.prisma.booking.create({
      data: {
        eventDate: dto.eventDate,
        speakerId: dto.speakerId,
        businessId: dto.businessId,
        eventDetails: dto.eventDetails,
        status: 'PENDING', // ✅ FIXED: add default status (you can change this as needed)
        createdAt: new Date(), // ✅ optional if your model requires
      },
    });
  }

  async getForUser(userId: string) {
    return this.prisma.booking.findMany({
      where: {
        OR: [
          { speakerId: userId },
          { businessId: userId },
        ],
      },
      include: {
        speakerProfile: true,
        businessProfile: true,
      },
    });
  }
}
