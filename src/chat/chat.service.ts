// 📍 Location: src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async saveMessage({
    bookingId,
    senderId,
    content,
  }: {
    bookingId: string;
    senderId: string;
    content: string;
  }) {
    return this.prisma.message.create({
      data: {
        chatRoomId: bookingId, // or adjust if it’s actually bookingId
        senderId,
        content,
        createdAt: new Date(),
      },
    });
  }
}
