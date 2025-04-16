import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { AiModule } from './ai/ai.module';
import { BookingsModule } from './bookings/booking.module';
import { ChatModule } from './chat/chat.module';
import { ContractsModule } from './contracts/contracts.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    AiModule,
    BookingsModule,
    ChatModule,
    ContractsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
