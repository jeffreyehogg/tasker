import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  // We need to know which list this task belongs to.
  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsString()
  @IsOptional() // This makes the description optional
  description?: string;
}