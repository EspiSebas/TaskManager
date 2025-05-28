import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManager } from 'src/task-manager/entities/task-manager.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskManager,Project,User])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
