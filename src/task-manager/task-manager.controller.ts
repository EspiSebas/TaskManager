import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/common/roles';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';

@ApiTags('TaskManager')
@Controller('task-manager')
export class TaskManagerController {
  constructor(private readonly taskManagerService: TaskManagerService) {}

  @Auth(Roles.ADMIN)
  @Post()
  create(@Body() createTaskManagerDto: CreateTaskManagerDto, @ActiveUser() user) {
    return this.taskManagerService.create(createTaskManagerDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all task' })
  @ApiResponse({ status: 200, description: 'List of task returned successfully.' })
  findAll() {
    return this.taskManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskManagerService.findOne(+id);
  }
  

  @Auth(Roles.DEVELOPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskManagerDto: UpdateTaskManagerDto) {
    return this.taskManagerService.update(+id, updateTaskManagerDto);
  }

  @Auth(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskManagerService.remove(+id);
  }

  @Get('developer/:id')
  findByDeveloper(@Param('id') id: string) {
    return this.taskManagerService.findByDeveloper(+id);
  }
}
