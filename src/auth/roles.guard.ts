import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { keyRoles } from './decorator/roles.decorator';
import { Roles } from 'src/common/roles';


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

    if(user.role == Roles.ADMIN){
      return true;
    }

  
    return roles === user.role;
  }
}
