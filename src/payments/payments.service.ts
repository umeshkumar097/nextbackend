import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsPaid(bookingId: string) {
    return this.prisma.payment.update({
      where: { bookingId },
      data: {
        status: 'PAID',
      },
    });
  }
}
