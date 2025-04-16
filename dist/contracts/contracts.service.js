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
exports.ContractsService = void 0;
// 📍 Location: src/contracts/contracts.service.ts
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContractsService = class ContractsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateAndUploadContract(bookingId, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                speakerProfile: true,
                businessProfile: true,
            },
        });
        if (!booking)
            throw new Error('Booking not found');
        const speakerName = booking.speakerProfile?.name || 'Speaker';
        const businessName = booking.businessProfile?.company || 'Business';
        return this.prisma.contract.create({
            data: {
                bookingId: booking.id,
                speakerName,
                businessName,
                contractUrl: 'https://dummycontract.com', // Replace with actual logic
                createdAt: new Date(),
            },
        });
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContractsService);
