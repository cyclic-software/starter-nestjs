import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      return request.isAuthenticated();
    } catch (error) {
      console.error('error in AuthenticatedGuard', error);
    }
  }
}
