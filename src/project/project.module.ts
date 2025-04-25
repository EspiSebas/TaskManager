import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManager } from 'src/task-manager/entities/task-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project,TaskManager])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
