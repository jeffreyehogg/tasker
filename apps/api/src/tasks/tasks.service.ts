import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTaskDto,
  UpdateTaskDto,
  Task,
} from '@repo/api';
import { randomUUID } from 'crypto';
import { ListsService } from '../lists/lists.service'; // <-- Import ListsService

@Injectable()
export class TasksService {
  private readonly _tasks: Task[] = [];

  // Inject ListsService
  constructor(private readonly listsService: ListsService) {}

  create(createTaskDto: CreateTaskDto): Task {
    // 1. Create the new task
    const newTask: Task = {
      id: randomUUID(),
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      listId: createTaskDto.listId,
      order: 0, // You'll implement ordering logic later
    };
    this._tasks.push(newTask);

    // 2. Add this task to its parent list
    try {
      this.listsService.addTaskToList(createTaskDto.listId, newTask);
    } catch (error) {
      this._tasks.pop(); // Roll back
      throw new NotFoundException(`List with ID "${createTaskDto.listId}" not found`);
    }
    
    return newTask;
  }

  findAll(): Task[] {
    return this._tasks;
  }

  findOne(id: string): Task {
    const task = this._tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    
    // Update fields if they are provided
    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }
    
    // Logic for moving to a new list would go here
    if (updateTaskDto.listId && updateTaskDto.listId !== task.listId) {
      // 1. Remove from old list
      const oldList = this.listsService.findOne(task.listId);
      oldList.tasks = oldList.tasks.filter(t => t.id !== id);
      
      // 2. Add to new list
      const newList = this.listsService.findOne(updateTaskDto.listId);
      newList.tasks.push(task);
      
      // 3. Update task's listId
      task.listId = updateTaskDto.listId;
    }

    return task;
  }

  remove(id: string) {
    const index = this._tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Remove from parent list's array
    const task = this._tasks[index];
    const list = this.listsService.findOne(task.listId);
    list.tasks = list.tasks.filter(t => t.id !== id);

    this._tasks.splice(index, 1);
    return { message: `Task with ID "${id}" deleted` };
  }
}