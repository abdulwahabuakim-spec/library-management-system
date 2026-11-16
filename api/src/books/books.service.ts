import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...dto,
        totalCopies: dto.totalCopies ?? 1,
        available: dto.totalCopies ?? 1,
      },
    });
  }

  findAll() {
    return this.prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }

  async borrow(bookId: string, userId: string) {
    const book = await this.findOne(bookId);
    if (book.available <= 0) throw new BadRequestException('No copies available');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    await this.prisma.book.update({
      where: { id: bookId },
      data: { available: { decrement: 1 } },
    });

    return this.prisma.borrow.create({
      data: { userId, bookId, dueDate },
      include: { book: true },
    });
  }

  async returnBook(borrowId: string, userId: string) {
    const borrow = await this.prisma.borrow.findUnique({ where: { id: borrowId } });
    if (!borrow || borrow.userId !== userId) throw new NotFoundException('Borrow record not found');
    if (borrow.returnedAt) throw new BadRequestException('Already returned');

    await this.prisma.book.update({
      where: { id: borrow.bookId },
      data: { available: { increment: 1 } },
    });

    return this.prisma.borrow.update({
      where: { id: borrowId },
      data: { returnedAt: new Date() },
    });
  }

  myBorrows(userId: string) {
    return this.prisma.borrow.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { borrowedAt: 'desc' },
    });
  }
}
