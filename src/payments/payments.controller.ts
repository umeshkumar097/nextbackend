import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    console.log('Webhook received:', req.body);
    return { received: true };
  }
}
