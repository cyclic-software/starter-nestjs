import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authServices: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = this.authServices.extractTokenFromHeaders(request);

    if (token === undefined) {
      return false;
    }
    const payload = await this.authServices.decryptTokenHeadersJwt(token);
    request.user = payload;

    return true;
  }
}
