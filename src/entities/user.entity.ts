import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/enums/user-role.enum';

@Schema()
class User {
  @Prop({ required: true, type: 'string' })
  fullName: string;
  @Prop({ required: true, type: 'string', unique: true })
  email: string;
  @Prop({ required: true, type: 'string' })
  password: string;
  @Prop({ required: true, type: 'string' })
  registrationDate: Date;
  @Prop({ required: true, type: 'string', enum: UserRole })
  userRole: UserRole;
  @Prop({required: false, type : 'string'})
  token?: string;
  @Prop({required: true, type: 'string'})
  salt?:string;
  @Prop({requierd: false, type: 'date'})
  loginDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
