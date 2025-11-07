import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBoardDto,
  UpdateBoardDto,
  Board,
  List,
} from '@repo/api';
import { randomUUID } from 'crypto';

@Injectable()
export class BoardsService {
  // Mock database, just like in links.service.ts
  private readonly _boards: Board[] = [];

  create(createBoardDto: CreateBoardDto): Board {
    const newBoard: Board = {
      id: randomUUID(),
      title: createBoardDto.title,
      lists: [], // A new board has no lists
    };
    this._boards.push(newBoard);
    return newBoard;
  }

  findAll(): Board[] {
    return this._boards;
  }

  findOne(id: string): Board {
    const board = this._boards.find((b) => b.id === id);
    if (!board) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return board;
  }

  // This helper will be used by ListsService later
  addListToBoard(boardId: string, list: List) {
    const board = this.findOne(boardId);
    board.lists.push(list);
    return board;
  }

  update(id: string, updateBoardDto: UpdateBoardDto): Board {
    const board = this.findOne(id);
    
    // Update title if provided
    if (updateBoardDto.title) {
      board.title = updateBoardDto.title;
    }
    
    return board;
  }

  remove(id: string) {
    const index = this._boards.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    // Note: This doesn't delete related lists or tasks yet!
    this._boards.splice(index, 1);
    return { message: `Board with ID "${id}" deleted` };
  }
}