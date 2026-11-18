import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    const { category, totalCopies, ...rest } = dto as any;
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

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id: Number(id) } });
  }

  async borrow(bookId: string, userId: string) {
    const book = await this.findOne(bookId);
    if (book.totalCopies <= 0) throw new BadRequestException('No copies totalCopies');

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

  async returnBook(borrowId: string, userId: string) {
    const borrow = await this.prisma.borrow.findUnique({ where: { id: Number(borrowId) } });
    if (!borrow || borrow.userId !== Number(userId)) throw new NotFoundException('Borrow record not found');
    if (borrow.returnedAt) throw new BadRequestException('Already returned');

    await this.prisma.book.update({
      where: { id: borrow.bookId },
      data: { totalCopies: { increment: 1 } },
    });

    return this.prisma.borrow.update({
      where: { id: Number(borrowId) },
      data: { returnedAt: new Date() },
    });
  }

  myBorrows(userId: string) {
    return this.prisma.borrow.findMany({
      where: { userId: Number(userId) },
      include: { book: true },
      orderBy: { borrowedAt: 'desc' },
    });
  }
}
