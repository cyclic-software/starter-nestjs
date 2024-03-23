import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export interface access_token {
    access_token: string;
}
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    singIn(username: string, pass: string): Promise<access_token>;
}
