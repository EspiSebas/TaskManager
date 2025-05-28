import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { TaskManager } from 'src/task-manager/entities/task-manager.entity';

@Injectable()
export class ProjectService {

  constructor(
      @InjectRepository(Project)
      private readonly projectRepository:Repository<Project>,
    
      @InjectRepository(TaskManager)
      private readonly taskRepository:Repository<TaskManager>
        
  ) {}

    


  async create(createProjectDto: CreateProjectDto) {
    const taskManager = await this.taskRepository.findBy({ name: createProjectDto.taskManager});
    if(!taskManager){
      throw new BadRequestException('Task Not Found !!');
    }
    return await this.projectRepository.save({
      ...createProjectDto,
      taskManager
    });
  }

  async findAll() {
    return await this.projectRepository.find({relations: ['taskManager']});
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
