import { SetMetadata } from "@nestjs/common";

export const keyRoles = "roles";
export const Roles = (role) => SetMetadata(keyRoles,role);