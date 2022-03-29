import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUser } from 'src/dto/create-user.dto';
import { User } from 'src/interface/user.interface';
import { Model } from 'mongoose';
import { UserRole } from 'src/enums/user-role.enum';
import { Todo } from 'src/interface/todo.interface';
import { LoginDto } from 'src/dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { getAllUsersTodos } from 'src/dto/get-all-user-todos.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    @InjectModel('Todo')
    private todoModel: Model<Todo>,
  ) {}
  async createUser(data: CreateUser): Promise<User> {
    // Implement creation
    const newUser = new this.userModel({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      userRole: UserRole.regular,
      registrationDate: new Date(),
    });
    await newUser.save();

    return {
      id: newUser._id,
      fullName: newUser.fullName,
      // password: newUser.password,
      email: newUser.email,
      userRole: newUser.userRole,
      registrationDate: newUser.registrationDate,
    };
  }
  async getAllUsers(): Promise<User[]> {
    const result = await this.userModel.find();
    if (result) {
      const userRes = result.map((newUser) => ({
        id: newUser._id,
        fullName: newUser.fullName,
        // password: newUser.password,
        email: newUser.email,
        userRole: newUser.userRole,
        registrationDate: newUser.registrationDate,
      }));
      return userRes;
    }
    return [];
  }
  async getAllUserTodos(id: string, query: getAllUsersTodos) {
    const loggedInUser = await this.findUserByToken(query.token);
    if (loggedInUser && loggedInUser.id === id) {
      const result = this.todoModel.find();
      result.where('author').equals(id);
      return await result;
    }else {
      return false;
    }

    // const result = await this.todoModel.find({
    //   author: id,
    // });
    // return result;
  }
  async LoginUser(data: LoginDto) {
    const findUser = await this.userModel.findOne({
      email: data.email,
      password: data.password,
    });
    findUser.isSelected('fullName id email');

    const foundUser = await findUser;

    if (foundUser) {
      // Generate token.
      const token =
        String(Math.random()) + String(uuidv4()) + String(Date.now());
      // Set token in DB
      await this.userModel.findByIdAndUpdate(foundUser.id, {
        token,
      });
      return {
        user: foundUser,
        token,
      };
    }
    return false;
  }
  async findUserByToken(token: string):Promise<User> {
    const foundUser = await this.userModel.findOne({
      token,
    });
    if (foundUser) {
      return foundUser;
    }
    return null;
  }
}

// const result = this.todoModel.find();
// result.where('author').equals(id)
// return await result; uuid
