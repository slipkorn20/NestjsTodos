import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { TodoStatus } from 'src/enums/todo-status.enum';
import { Todo } from '../../interface/todo.interface';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { stringify } from 'querystring';
import { GetAllTodosDto } from 'src/dto/get-all-todos.dto';
import { User } from 'src/interface/user.interface';


@Injectable()
export class TodoService {
  // private database: Todo[] = [];
  constructor(
    @InjectModel('Todo')
    private todoModel: Model<Todo>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async getAllTodos(data: GetAllTodosDto): Promise<Todo[]> {
    // console.log(data);
    const query = this.todoModel.find(data.searchBy);
    if (data.fields) {
      query.select(data.fields);
    }
    if (data.sort) {
      query.sort(data.sort);
    } else {
      query.sort('-dateCreated');
    }

    if (data.limit) {
      const limit = Number(data.limit);
      const page = data.page ? Number(data.page) - 1 : 0;

      query.limit(limit);

      query.skip(limit * page);
    } else {
      query.limit(25);
    }
query.populate('author', 'id email fullName')

    const result = await query;

    const todoResults : Todo[] = result.map((todo) => ({
      id: todo._id,
      text: todo.text,
      author: todo.author,
      status: todo.status, // incopmplete complete deleted
      dateCreated: todo.dateCreated,
    }));
    return todoResults;
  }

  async getOneTodo(id: string): Promise<Todo> {
    const foundTodo = await this.todoModel.findById(id);
    return {
      id: foundTodo._id,
      text: foundTodo.text,
      author: foundTodo.author,
      status: foundTodo.status, // incopmplete complete deleted
      dateCreated: foundTodo.dateCreated,
    }
  }

  async createTodo(data: CreateTodoDto) {

    const createdTodo = new this.todoModel({
      ...data,
      // text: data.text,
      // author: data.author,
      dateCreated: new Date(),
    });
    const result = await createdTodo.save();
    return {
      id: result._id,
      text: result.text,
      author: result.author,
      status: result.status, // incopmplete complete deleted
      dateCreated: result.dateCreated,
    }
    // const {text, author } = data;
    // const newTodo: Todo = {
    //   id: String(Math.random()) + String(Math.random()),
    //   text: data.text,
    //   author: data.author,
    //   status: TodoStatus.incomplete,
    //   dateCreated: new Date(),
    // };
    // this.database.push(newTodo);
    // return newTodo;
  }

  async deleteOneTodo(id: string): Promise<Todo> {
    const foundTodo = await this.todoModel.findByIdAndDelete(id);
    return {
      id: foundTodo._id,
      text: foundTodo.text,
      author: foundTodo.author,
      status: foundTodo.status,  // incopmplete complete deleted
      dateCreated: foundTodo.dateCreated,
    }
  }
  // updateOneTodo(id:string, data: UpdateTodoDto){
  //   for (let i = 0; i < this.database.length; i++){
  //        const todo = this.database[i];
  //        if(todo.id === id){
  //          this.database[i] = {
  //            ...todo,
  //            ...data
  //          }
  //          return this.database[i];
  //        }
  //   }

  //   findOneTodo(sortBy: String, limit:Number) {
  //     throw new Error('Method not implemented.')
  //   }
  // }
}
