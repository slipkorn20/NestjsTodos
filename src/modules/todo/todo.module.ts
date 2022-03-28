import { Controller, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'src/entities/todo.entity';
import { UserSchema } from 'src/entities/user.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
   MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])

],
  controllers: [TodoController],
  providers: [TodoService],
 
})
export class TodoModule {}
