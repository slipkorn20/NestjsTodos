import { TodoStatus } from 'src/enums/todo-status.enum';

export class UpdateTodoDto {
    text?: string;
    status?:TodoStatus;
}