import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
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
    myBorrows(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
        userId: number;
        bookId: number;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
    })[]>;
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
    borrow(id: string, req: any): Promise<{
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
        userId: number;
        bookId: number;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
    }>;
    returnBook(borrowId: string, req: any): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        bookId: number;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
    }>;
}
