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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BooksService = class BooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { category, totalCopies, ...rest } = dto;
        return this.prisma.book.create({
            data: {
                ...rest,
                totalCopies: totalCopies ?? 1,
                genre: {
                    connectOrCreate: {
                        where: { name: category ?? 'General' },
                        create: { name: category ?? 'General' },
                    },
                },
            },
        });
    }
    findAll() {
        return this.prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const book = await this.prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.book.delete({ where: { id: Number(id) } });
    }
    async borrow(bookId, userId) {
        const book = await this.findOne(bookId);
        if (book.totalCopies <= 0)
            throw new common_1.BadRequestException('No copies totalCopies');
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        await this.prisma.book.update({
            where: { id: Number(bookId) },
            data: { totalCopies: { decrement: 1 } },
        });
        return this.prisma.borrow.create({
            data: { userId: Number(userId), bookId: Number(bookId), dueDate },
            include: { book: true },
        });
    }
    async returnBook(borrowId, userId) {
        const borrow = await this.prisma.borrow.findUnique({ where: { id: Number(borrowId) } });
        if (!borrow || borrow.userId !== Number(userId))
            throw new common_1.NotFoundException('Borrow record not found');
        if (borrow.returnedAt)
            throw new common_1.BadRequestException('Already returned');
        await this.prisma.book.update({
            where: { id: borrow.bookId },
            data: { totalCopies: { increment: 1 } },
        });
        return this.prisma.borrow.update({
            where: { id: Number(borrowId) },
            data: { returnedAt: new Date() },
        });
    }
    myBorrows(userId) {
        return this.prisma.borrow.findMany({
            where: { userId: Number(userId) },
            include: { book: true },
            orderBy: { borrowedAt: 'desc' },
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map