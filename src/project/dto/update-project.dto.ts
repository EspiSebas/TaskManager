import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/common/states.enum';

export class UpdateProjectDto{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;



    @IsOptional()
    state?: Status;
}
