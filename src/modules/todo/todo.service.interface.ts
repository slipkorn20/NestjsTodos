import { UpdateTodoDto } from "src/dto/update-todo.dto";
import {Todo } from "src/interface/todo.interface"

export interface TodoServiceContract {
    findOneTodo(sortBy: string, limit: number)
    updateOneTodo(id: string,  data: UpdateTodoDto) : Todo;
}