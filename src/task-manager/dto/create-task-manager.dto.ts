import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "../../common/states.enum";

export class CreateTaskManagerDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    state?: Status;

    @IsOptional()
    comment?: string;

    @IsString()
    project: string;

    /*@IsString()
    user: string;
    */
   
    @IsString()
    dev: string;
}
