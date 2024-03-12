import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singIn(logindata: any): Promise<import("./auth.service").access_token>;
    getProfile(req: any): any;
}
