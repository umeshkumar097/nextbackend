import { Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('kyc-pending')
  getKycPending() {
    return this.adminService.getPendingKYCs();
  }

  @Post('kyc-approve/:id')
  approve(@Param('id') id: string) {
    return this.adminService.approveKyc(id);
  }

  @Get('analytics')
  getAnalytics() {
    return this.adminService.getPlatformAnalytics();
  }
}
