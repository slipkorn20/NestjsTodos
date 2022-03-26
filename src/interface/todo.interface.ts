import { TodoStatus } from '../enums/todo-status.enum';

export interface Todo {
    id:string;
    text: string;
    author: string;
    status?: TodoStatus;
    dateCreated: Date;
}