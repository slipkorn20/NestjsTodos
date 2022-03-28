import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/interface/user.interface';
import { Types } from 'mongoose'
import { UserSchema } from './user.entity';

@Schema()
class Todo {
  

  @Prop({ required: true, type: 'string' })
  text: string;
  // @Prop({ required: true, type: 'string' })
  @Prop({ required: true, type : Types.ObjectId, ref: 'User'})
  author: string;
  @Prop({ required: true, type: 'string' })
  dateCreated: Date;
  // @Prop({ required: true, type: 'string' })
  // user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
