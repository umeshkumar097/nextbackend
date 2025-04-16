// 📍 Location: src/contracts/contracts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateAndUploadContract(bookingId: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        speakerProfile: true,
        businessProfile: true,
      },
    });

    if (!booking) throw new Error('Booking not found');

    const speakerName = booking.speakerProfile?.name || 'Speaker';
    const businessName = booking.businessProfile?.company || 'Business';

    return this.prisma.contract.create({
      data: {
        bookingId: booking.id,
        speakerName,
        businessName,
        contractUrl: 'https://dummycontract.com', // Replace with actual logic
        createdAt: new Date(),
      },
    });
  }
}
