import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodoModule,
    CommentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://TestLevel:Cockroach123@nestcluster.pxnvi.mongodb.net/todoapp?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
