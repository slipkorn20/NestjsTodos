import { Controller, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'src/entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
 
})
export class TodoModule {}
