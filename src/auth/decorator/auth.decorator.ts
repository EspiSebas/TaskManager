import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from './roles.decorator';
import { Roles } from 'src/common/roles';
import { AuthGuard } from '../auth.guard';
import { RolesGuard } from '../roles.guard';


export function Auth(role: Roles) {
  return applyDecorators(Role(role), UseGuards(AuthGuard, RolesGuard));
}