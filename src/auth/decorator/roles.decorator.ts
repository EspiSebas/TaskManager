import { SetMetadata } from "@nestjs/common";

export const keyRoles = "roles";
export const Role = (role) => SetMetadata(keyRoles,role);