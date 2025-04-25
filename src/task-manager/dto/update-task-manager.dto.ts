import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskManagerDto } from './create-task-manager.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskState } from '../entities/states.enum';

export class UpdateTaskManagerDto {
        @IsString()
        @IsNotEmpty()
        @IsOptional()
        name:string;
        
        @IsString()
        @IsOptional()
        @IsNotEmpty()
        description:string;
    
        @IsOptional()
        state?: TaskState;

        @IsOptional()
        comment?: string
}
