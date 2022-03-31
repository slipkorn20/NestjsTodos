import { Module } from '@nestjs/common';
import { HttpBearerStrategy } from './http-bearer.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
    }),
    UsersModule,
  ],

  providers: [HttpBearerStrategy],
})
export class AuthModule {}
