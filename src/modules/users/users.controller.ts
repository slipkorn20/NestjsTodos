import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUser } from 'src/dto/create-user.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() data: CreateUser) {
    try {
      const result = await this.usersService.createUser(data);
    } catch (err) {
      if (err.code === 11000) {
        return getErrorMessage(
          `Could not create user with email ${data.email} as it already exists `,
        );
      } else {
        return getErrorMessage('could not create user');
      }
      //return getErrorMessage('could not create user' + err.code);
    }
  }

  @Get()
  async getUsers() {
    const result = await this.usersService.getAllUsers();
    return getSuccessMessage(result);
  }

  @Get('/:userId/todos')
  async getUserTodos(@Param('userId')userId) {
     return await this.usersService.getAllUserTodos(userId)
  }
}
