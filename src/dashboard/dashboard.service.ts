import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { TaskManager } from 'src/task-manager/entities/task-manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Not, Repository } from 'typeorm';
import { Status } from 'src/common/states.enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(TaskManager)
    private readonly taskRepository:Repository<TaskManager>,
    
    @InjectRepository(Project)
    private readonly projectRepository:Repository<Project>,
  ){}
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async findAll() {
  
    const taskActives =  await this.taskRepository.count({where:{state: Not(Status.COMPLETED)}});
    const taskFinished =  await this.taskRepository.count({where:{state: Status.COMPLETED}});
    const projectActive = await this.projectRepository.count({ where:{ state: Not(Status.COMPLETED)}})
    const data = [
      { icon: '👷', label: 'Actives Tasks', value: taskActives },
      { icon: '📁', label: 'Actives Projects', value: projectActive },
      { icon: '✅', label: 'Completed Task', value: taskFinished }    
    ]
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
