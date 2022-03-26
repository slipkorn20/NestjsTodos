import { Type } from "class-transformer";
import { IsArray, IsInt, isNumber, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Todo } from "src/interface/todo.interface";

class SearchFields {
    @IsString()
    @IsOptional()
    text:string;
    
    @IsString()
    @IsOptional()
    author:string;
}

export class GetAllTodosDto{
    @IsOptional()
    @IsString()
    sort?: string;
    @IsString({
        each: true,
    })
    @IsOptional()
    fields?: string[];
  
    @Type(() => SearchFields)
    @ValidateNested()
    searchBy?:SearchFields;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    limit?: string;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    page?: string;
}

