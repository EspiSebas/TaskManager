import { Module } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { TaskManagerController } from './task-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManager } from './entities/task-manager.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TaskManager,Project,User])],
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
  exports:[TypeOrmModule]
})
export class TaskManagerModule {}
