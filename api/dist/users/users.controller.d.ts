import { UsersService } from './users.service';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
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
