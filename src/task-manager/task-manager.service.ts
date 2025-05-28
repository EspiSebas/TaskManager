import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskManager } from './entities/task-manager.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TaskManagerService {

  constructor(
    @InjectRepository(TaskManager)
    private readonly taskRepository:Repository<TaskManager>,

    @InjectRepository(Project)
    private readonly projectRepository:Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
  ) {}

  async create(createTaskManagerDto: CreateTaskManagerDto,user:any) {
    const project = await this.validateProject(createTaskManagerDto.project)

    const dev = await this.validateDeveloper(createTaskManagerDto.dev)
    
    return await this.taskRepository.save({...createTaskManagerDto,
      project: project,
      dev: dev
    });
  }

  async findAll() {
    return await this.taskRepository.find({ relations: ['dev','project'],});
  }

  async findOne(id: number) {
    return await this.taskRepository.findBy({id});
  }

  async findByDeveloper(id: number) {
    return await this.taskRepository.findBy({dev:{id}});
  }

  async update(id: number, updateTaskManagerDto: UpdateTaskManagerDto) {
    return await this.taskRepository.update(id,updateTaskManagerDto);
  }

  async remove(id: number) {
    return await this.taskRepository.softDelete({id});
  }

  private async validateProject(project: string) {
    const projectEntity = await this.projectRepository.findOneBy({ name: project });
  
    if (!projectEntity) {
      throw new BadRequestException('Porject not found');
    }
  
    return projectEntity;
  }

  
  private async validateDeveloper(user: string) {
    const userEntity = await this.userRepository.findOneBy({ name: user });
  
    if (!userEntity) {
      throw new BadRequestException('Developer not found');
    }
  
    return userEntity;
  }
}
