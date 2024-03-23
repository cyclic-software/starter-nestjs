import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


export interface access_token{
    access_token: string
}

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async   singIn(username: string, pass: string): Promise<access_token> {

        const user = await this.userService.findOne(username);

        if (user?.password !== pass) { // aqui tengo que encryptar/des
            throw new UnauthorizedException('Acceso denegado');
        }

        const payload = { sub: user.id_user, user: user.username, role: user.role }
        // return 'ok';
         return { access_token: await this.jwtService.signAsync(payload) };
    }
 
 

}
