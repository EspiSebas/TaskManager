import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskState } from "../entities/states.enum";

export class CreateTaskManagerDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    state?: TaskState

    @IsOptional()
    comment?: string
}
