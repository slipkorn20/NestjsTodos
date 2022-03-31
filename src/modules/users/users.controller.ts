import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('bearer'))
  async getUsers() {
    const result = await this.usersService.getAllUsers();
    return getSuccessMessage(result);
  }

  @Get('/:userId/todos')
  @UseGuards(AuthGuard('bearer'))
  async getUserTodos(@Req() req) {
    const result = await this.usersService.getAllUserTodos(req.user);
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
