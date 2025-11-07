import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  // We need to know which board this list belongs to.
  @IsString()
  @IsNotEmpty()
  boardId: string;
}