import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUser } from 'src/dto/create-user.dto';
import { User } from 'src/interface/user.interface';
import { Model } from 'mongoose';
import { UserRole } from 'src/enums/user-role.enum';
import { Todo } from 'src/interface/todo.interface';

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
      fullName: data.fullName,
      userRole: UserRole.regular,
      registrationDate: new Date(),
    });
    await newUser.save();

    return {
      id: newUser._id,
      fullName: newUser.fullName,
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
        email: newUser.email,
        userRole: newUser.userRole,
        registrationDate: newUser.registrationDate,
      }));
      return userRes
    }
    return [];
  }
  async getAllUserTodos(id: string) {
const result = await this.todoModel.find({
  author: id,
});
return result;
  }
}

// const result = this.todoModel.find();
// result.where('author').equals(id)
// return await result;