import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() dto: CreateBookingDto, @Req() req: any) {
    return this.bookingService.create(dto, req.user.uid);
  }
}
