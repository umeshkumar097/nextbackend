"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPendingKYCs() {
        return this.prisma.speakerProfile.findMany({
            where: {
                kycStatus: 'PENDING',
            },
        });
    }
    async approveKyc(id) {
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
