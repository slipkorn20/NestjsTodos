import { IsDate, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { TodoStatus } from '../enums/todo-status.enum';

export class CreateTodoDto {
    // @MaxLength(10)
    @IsString()
    text: string;
    @IsString()
    @IsOptional()
    @MinLength(3)
    author?: string;
    @IsEnum(TodoStatus)
    @IsOptional()
    status: TodoStatus;
    @IsDate()
    @IsOptional()
    date: Date
}