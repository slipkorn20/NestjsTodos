import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUser {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(256)
  password: string;
}
