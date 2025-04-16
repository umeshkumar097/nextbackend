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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const auth_guard_1 = require("../auth/auth.guard");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(dto, req) {
        return this.bookingService.create(dto, req.user.uid);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('bookings'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
