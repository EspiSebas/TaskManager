import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  name: string;
  
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  taskManager?: string[];
  
}
