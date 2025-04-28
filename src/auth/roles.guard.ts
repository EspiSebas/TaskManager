import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { keyRoles } from './decorator/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const roles = this.reflector.getAllAndOverride(keyRoles,[
      context.getHandler(),
      context.getClass(),
    ])

    if(!roles){
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

  
    return roles === user.role;
  }
}
