import { TodoStatus } from '../enums/todo-status.enum';
import { User } from './user.interface';

export interface Todo {
    id: any;
    text: string;
    author: User;
    status?: TodoStatus;
    dateCreated: Date;
}