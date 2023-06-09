import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// eslint-disable-next-line prettier/prettier
export class JwtAuthGuard extends AuthGuard('jwt') {}
