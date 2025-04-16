import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server!: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, { bookingId }: { bookingId: string }) {
    client.join(bookingId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    {
      bookingId,
      senderId,
      content,
    }: { bookingId: string; senderId: string; content: string },
  ) {
    await this.chatService.saveMessage({ bookingId, senderId, content });
    this.server.to(bookingId).emit('newMessage', { senderId, content });
  }
}
