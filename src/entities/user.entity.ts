import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "src/enums/user-role.enum";

@Schema()
class User {
    @Prop({ required: true, type: 'string', })
    fullName: string;
    @Prop({ required: true, type: 'string', unique: true})
    email: string;
    @Prop({ required: true, type: 'string'})
    registrationDate: Date;
    @Prop({ required: true, type: 'string', enum: UserRole})
    userRole: UserRole;

}


export const UserSchema = SchemaFactory.createForClass(User);
