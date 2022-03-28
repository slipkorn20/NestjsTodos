import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './modules/todo/todo.controller';
import { TodoModule } from './modules/todo/todo.module';
import { TodoService } from './modules/todo/todo.service';
import { CommentsModule } from './modules/comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';


@Module({
  imports: [
    TodoModule,
    CommentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://TestLevel:Cockroach123@nestcluster.pxnvi.mongodb.net/todoapp?retryWrites=true&w=majority',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//AppController AppService