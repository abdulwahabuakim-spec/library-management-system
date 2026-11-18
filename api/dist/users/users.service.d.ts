import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        name: string;
        role: string;
        id: number;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        name: string;
        role: string;
        id: number;
        createdAt: Date;
    }>;
}
