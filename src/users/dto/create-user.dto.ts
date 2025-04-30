import { IsOptional, IsString } from "class-validator";
import { Roles } from "src/common/roles";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role:Roles;

    

}
