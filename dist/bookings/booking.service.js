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
exports.BookingService = void 0;
// src/bookings/booking.service.ts
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingService = class BookingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        return await this.prisma.booking.create({
            data: {
                eventDate: dto.eventDate,
                speakerId: dto.speakerId,
                businessId: dto.businessId,
                eventDetails: dto.eventDetails,
                status: 'PENDING', // ✅ FIXED: add default status (you can change this as needed)
                createdAt: new Date(), // ✅ optional if your model requires
            },
        });
    }
    async getForUser(userId) {
        return this.prisma.booking.findMany({
            where: {
                OR: [
                    { speakerId: userId },
                    { businessId: userId },
                ],
            },
            include: {
                speakerProfile: true,
                businessProfile: true,
            },
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
