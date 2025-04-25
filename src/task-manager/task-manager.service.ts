import { Injectable } from '@nestjs/common';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskManager } from './entities/task-manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskManagerService {

  constructor(
    @InjectRepository(TaskManager)
    private readonly taskRepository:Repository<TaskManager>
  ) {}

  async create(createTaskManagerDto: CreateTaskManagerDto) {
    //const task =  this.taskRepository.create(createTaskManagerDto);
    return await this.taskRepository.save(createTaskManagerDto);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    return await this.taskRepository.findBy({id});
  }

  async update(id: number, updateTaskManagerDto: UpdateTaskManagerDto) {
    return await this.taskRepository.update(id,updateTaskManagerDto);
  }

  async remove(id: number) {
    return await this.taskRepository.softDelete({id});
  }
}
