import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class HttpBearerStrategy extends PassportStrategy(Strategy){
        constructor(){
            super();
        }
        async validate(token: string){
            console.log('token', token)
         return true;
        }
}