import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { Todo } from 'src/interface/todo.interface';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { GetAllTodosDto } from 'src/dto/get-all-todos.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getAllTodos(@Query() data: GetAllTodosDto) {
    try {
      const todos = await this.todoService.getAllTodos(data);
      return getSuccessMessage(todos);
    } catch (err) {
      return getErrorMessage('Could not get todos with given params');
    }
  }

  @Get(':id')
  async getOneTodo(@Param('id') id: string) {
    try {
      const foundTodo = await this.todoService.getOneTodo(id);
      return getSuccessMessage(foundTodo);
    } catch (err) {
      return getErrorMessage('Could not find todos with given params');
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTodo(@Body() data: CreateTodoDto) {
    try {
      const result = await this.todoService.createTodo(data);
      return {
        status: 'success',
        data: {
          todo: result,
        },
      };
    } catch (err) {
      return getErrorMessage('Could not create todos with given params');
    }
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId') id: string) {
    const deleteTodo = await this.todoService.deleteOneTodo(id);
    return {
      status: 'success',
      data: {
        deleted: deleteTodo,
      },
    };
    // createTodo(@Body('id') id, @Body('text') txt) {
    //   console.log(id, txt);
    //   return {
    //     creating: 'Todos',
    //   };
    // }
  }
  @Put(':id')
  UsePipes(ValidationPipe)
  UpdateTodo(@Param('id') id: string, @Body() data: UpdateTodoDto) {
    //  this.todoService.update(data)
    // const updatedTodo = this.todoService.updateOneTodo(id,data);
    //       return{
    //         status: 'success',
    //         data: {
    //           updated:updatedTodo,
    //         }
    //       }
  }
}
