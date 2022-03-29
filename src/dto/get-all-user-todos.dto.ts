import { IsString } from "class-validator";

export class getAllUsersTodos {
    @IsString()
    token: string;
}