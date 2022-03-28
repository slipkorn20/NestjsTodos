import { IsEmail, IsString } from "class-validator";

export class CreateUser {
    @IsString()
    fullName: string;
    @IsEmail()
    email:string;

}