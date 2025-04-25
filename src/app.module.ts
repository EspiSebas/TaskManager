import { Module } from '@nestjs/common';
import { TaskManagerModule } from './task-manager/task-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'task',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectModule,
    TaskManagerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
 
}
