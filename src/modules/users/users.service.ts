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
import { sha256 } from 'js-sha256';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    @InjectModel('Todo')
    private todoModel: Model<Todo>,
  ) {}
  async createUser(data: CreateUser): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(data.password, salt);
    // Implement creation
    const newUser = new this.userModel({
      email: data.email,
      password: hashedPass,
      fullName: data.fullName,
      userRole: UserRole.regular,
      registrationDate: new Date(),
      salt,
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
  async getAllUserTodos(user: User) {
     
      const result = this.todoModel.find();
      result.where('author').equals(user.id);
      return await result;
    
    // const result = await this.todoModel.find({
    //   author: id,
    // });
    // return result;
  }
  async LoginUser(data: LoginDto) {
    // const hashedPass = sha256(data.password)

    const findUser = await this.userModel.findOne({
      email: data.email,
      // password: hashedPass,
    });
    // findUser.isSelected('fullName id email password');

    const foundUser = await findUser;
    if (!foundUser) {
      return false;
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      foundUser.password,
    );
    if (isPasswordMatch) {
      // Generate token.
      const token = sha256(
        String(Math.random()) +
          String(uuidv4()) +
          String(Date.now() + foundUser.id),
      );
      // Set token in DB
      await this.userModel.findByIdAndUpdate(foundUser.id, {
        token,
        loginDate: new Date(),
      });
      return {
        user: {
          email: foundUser.email,
          fullName:foundUser.fullName,
          id: foundUser.id,
        },
        token,
      };
    }
    return false;
  }
  async findUserByToken(token: string): Promise<User> {
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
