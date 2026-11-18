import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        email: string;
        name: string;
        role: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        email: string;
        name: string;
        role: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
