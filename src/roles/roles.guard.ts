
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Roles } from './roles.decorator';
import { Role } from './role.enum';



@Injectable()
export class RolesGuard implements CanActivate {

  constructor(public reflector: Reflector) { }


  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (requiredRoles.some((role) => user.role?.includes(role))) {
      return true;
    }else{
      throw new UnauthorizedException("Rol Insuficiente")
    }
    
  }

}
