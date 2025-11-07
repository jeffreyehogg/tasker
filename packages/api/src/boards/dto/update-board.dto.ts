import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';

// PartialType makes all properties of CreateBoardDto optional.
export class UpdateBoardDto extends PartialType(CreateBoardDto) {}