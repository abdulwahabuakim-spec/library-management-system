import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        coverImage: string | null;
        genreId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        coverImage: string | null;
        genreId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        coverImage: string | null;
        genreId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        coverImage: string | null;
        genreId: number;
    }>;
    borrow(bookId: string, userId: string): Promise<{
        book: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            isbn: string;
            totalCopies: number;
            coverImage: string | null;
            genreId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    }>;
    returnBook(borrowId: string, userId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    }>;
    myBorrows(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        book: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            isbn: string;
            totalCopies: number;
            coverImage: string | null;
            genreId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    })[]>;
}
