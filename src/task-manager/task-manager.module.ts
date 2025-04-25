import { Module } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { TaskManagerController } from './task-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManager } from './entities/task-manager.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TaskManager])],
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
  exports:[TypeOrmModule]
})
export class TaskManagerModule {}
