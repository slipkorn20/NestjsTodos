import { Module } from '@nestjs/common';
import { HttpBearerStrategy } from './http-bearer.strategy';

@Module({
    providers: [HttpBearerStrategy],
    exports:  [HttpBearerStrategy],
})
export class AuthModule {}
