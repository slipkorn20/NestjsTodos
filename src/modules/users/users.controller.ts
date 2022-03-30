import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUser } from 'src/dto/create-user.dto';
import { getAllUsersTodos } from 'src/dto/get-all-user-todos.dto';
import { LoginDto } from 'src/dto/login.dto';
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
  async getUserTodos(
    @Param('userId') userId,
    @Query() query: getAllUsersTodos,
  ) {
    const result = await this.usersService.getAllUserTodos(userId, query);
    if (result) {
      return getSuccessMessage(result);
    }
    return getErrorMessage('Could not get todos');
  }

  @Post('/login')
  async loginUser(@Body() data: LoginDto) {
    const result = await this.usersService.LoginUser(data);

    if (result) {
      return getSuccessMessage(result);
    } else {
      return getErrorMessage('Username or password incorrect');
    }
  }
}
