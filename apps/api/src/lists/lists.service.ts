import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateListDto,
  UpdateListDto,
  List,
  Task,
} from '@repo/api';
import { randomUUID } from 'crypto';
import { BoardsService } from '../boards/boards.service'; // <-- Import BoardsService

@Injectable()
export class ListsService {
  private readonly _lists: List[] = [];

  // Inject BoardsService into this service
  constructor(private readonly boardsService: BoardsService) {}

  create(createListDto: CreateListDto): List {
    // 1. Create the new list
    const newList: List = {
      id: randomUUID(),
      title: createListDto.title,
      boardId: createListDto.boardId,
      order: 0, // You'll implement ordering logic later
      tasks: [],
    };
    this._lists.push(newList);

    // 2. Add this new list to its parent board
    try {
      this.boardsService.addListToBoard(createListDto.boardId, newList);
    } catch (error) {
      // If the board doesn't exist, we should roll back
      this._lists.pop(); // Remove the list we just added
      throw new NotFoundException(`Board with ID "${createListDto.boardId}" not found`);
    }

    return newList;
  }

  findAll(): List[] {
    return this._lists;
  }

  findOne(id: string): List {
    const list = this._lists.find((l) => l.id === id);
    if (!list) {
      throw new NotFoundException(`List with ID "${id}" not found`);
    }
    return list;
  }
  
  // Helper for TasksService
  addTaskToList(listId: string, task: Task) {
    const list = this.findOne(listId);
    list.tasks.push(task);
    return list;
  }

  update(id: string, updateListDto: UpdateListDto): List {
    const list = this.findOne(id);

    if (updateListDto.title) {
      list.title = updateListDto.title;
    }
    // You would add order/position logic here later
    
    return list;
  }

  remove(id: string) {
    const index = this._lists.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new NotFoundException(`List with ID "${id}" not found`);
    }
    // We also need to remove this list from its parent board's array
    const list = this._lists[index];
    const board = this.boardsService.findOne(list.boardId);
    board.lists = board.lists.filter(l => l.id !== id);

    this._lists.splice(index, 1);
    return { message: `List with ID "${id}" deleted` };
  }
}