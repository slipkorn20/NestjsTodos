import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Todo {
  
  // @Prop({ required: true, type: 'string' })
  // id: string;
  @Prop({ required: true, type: 'string' })
  text: string;
  @Prop({ required: true, type: 'string' })
  author: string;
  @Prop({ required: true, type: 'string' })
  //   status: TodoStatus,
  dateCreated: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
