import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module'; 

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    LinksModule,
    BoardsModule,
    ListsModule,
    TasksModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}