import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Post(':id/borrow')
  @UseGuards(JwtAuthGuard)
  borrow(@Param('id') id: string, @Request() req) {
    return this.booksService.borrow(id, req.user.userId);
  }

  @Post('return/:borrowId')
  @UseGuards(JwtAuthGuard)
  returnBook(@Param('borrowId') borrowId: string, @Request() req) {
    return this.booksService.returnBook(borrowId, req.user.userId);
  }

  @Get('my/borrows')
  @UseGuards(JwtAuthGuard)
  myBorrows(@Request() req) {
    return this.booksService.myBorrows(req.user.userId);
  }
}
