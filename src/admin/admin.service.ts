import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getPendingKYCs() {
    return this.prisma.speakerProfile.findMany({
      where: {
        kycStatus: 'PENDING',
      },
    });
  }

  async approveKyc(id: string) {
    return this.prisma.speakerProfile.update({
      where: { id },
      data: {
        kycStatus: 'APPROVED',
      },
    });
  }

  async getPlatformAnalytics() {
    const totalBookings = await this.prisma.booking.count();
    const totalRevenue = await this.prisma.payment.aggregate({
      _sum: { amount: true },
    });
    const topSpeakers = await this.prisma.speakerProfile.findMany({
      orderBy: { rating: 'desc' },
      take: 5,
    });

    return {
      totalBookings,
      totalRevenue: totalRevenue._sum.amount,
      topSpeakers,
    };
  }
}
