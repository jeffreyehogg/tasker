import { List } from '../../lists/entities/list.entity';

export class Board {
  id: string;
  title: string;
  lists: List[]; 
}