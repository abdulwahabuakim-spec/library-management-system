import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
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
    borrow(id: string, req: any): Promise<{
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
    returnBook(borrowId: string, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        borrowedAt: Date;
        dueDate: Date | null;
        returnedAt: Date | null;
        userId: number;
        bookId: number;
    }>;
    myBorrows(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
