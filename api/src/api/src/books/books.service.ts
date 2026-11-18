import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { QueryBooksDto } from './dto/query-books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: dto,
      include: { genre: true },
    });
  }

  findAll(query: QueryBooksDto) {
    const { search, genreId } = query;

    return this.prisma.book.findMany({
      where: {
        AND: [
          genreId ? { genreId } : {},
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { author: { contains: search, mode: 'insensitive' } },
                  { isbn: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      include: { genre: true },
      orderBy: { title: 'asc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);
    return this.【entity-prisma¦canonical_name=Prisma】.book.update({
      where: { id },
      data: dto,
      include: { genre: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.【entity-prisma¦canonical_name=Prisma】.book.delete({ where: { id } });
  }
}