import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookDto): Promise<{
        title: string;
        author: string;
        isbn: string;
        coverImage: string | null;
        totalCopies: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        genreId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        title: string;
        author: string;
        isbn: string;
        coverImage: string | null;
        totalCopies: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        genreId: number;
    }[]>;
    findOne(id: string): Promise<{
        title: string;
        author: string;
        isbn: string;
        coverImage: string | null;
        totalCopies: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        genreId: number;
    }>;
    remove(id: string): Promise<{
        title: string;
        author: string;
        isbn: string;
        coverImage: string | null;
        totalCopies: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        genreId: number;
    }>;
    borrow(bookId: string, userId: string): Promise<{
        book: {
            title: string;
            author: string;
            isbn: string;
            coverImage: string | null;
            totalCopies: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            genreId: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    }>;
    returnBook(borrowId: string, userId: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    }>;
    myBorrows(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        book: {
            title: string;
            author: string;
            isbn: string;
            coverImage: string | null;
            totalCopies: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            genreId: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    })[]>;
}
