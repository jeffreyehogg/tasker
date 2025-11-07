import { Task } from '../../tasks/entities/task.entity';

export class List {
  id: string;
  title: string;
  order: number; 
  boardId: string; 
  tasks: Task[]; 
}