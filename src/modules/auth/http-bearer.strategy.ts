import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { UsersService } from '../users/users.service';


@Injectable()
export class HttpBearerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }
  async validate(token: string) {
    const foundUser = await this.usersService.findUserByToken(token);
    if (foundUser) {
      return foundUser;
    } else {
      return false;
    }
  }
}
