import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { TaskManager } from 'src/task-manager/entities/task-manager.entity';

@Injectable()
export class ProjectService {

  constructor(
      @InjectRepository(Project)
      private readonly projectRepository:Repository<Project>,
    
      @InjectRepository(TaskManager)
      private readonly taskRepository:Repository<TaskManager>
        
  ) {}

    

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    let tareas: TaskManager[] = [];

    if (createProjectDto.taskManager && createProjectDto.taskManager.length > 0) {
      tareas = await this.taskRepository.find({
        where: { name: In(createProjectDto.taskManager) },
        relations: ['project'],
      });

      if (tareas.length !== createProjectDto.taskManager.length) {
        throw new BadRequestException('No se encontraron todas las tareas.');
      }

      const tareasAsignadas = tareas.filter(t => t.project);
      if (tareasAsignadas.length > 0) {
        throw new BadRequestException('Una o más tareas ya están asignadas a un proyecto.');
      }
    }

    const proyecto = this.projectRepository.create({
      name: createProjectDto.name,
      taskManager: tareas,
    });

    return await this.projectRepository.save(proyecto);
  }

  async findAll() {
    return await this.projectRepository.find({relations: ['taskManager']});
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
     return await this.projectRepository.update(id,updateProjectDto);
  }

  async remove(id: number) {
    const delet = await this.projectRepository.softDelete({id});
    return 'Removed correctly';
  }
}
