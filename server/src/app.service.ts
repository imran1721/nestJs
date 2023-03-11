import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
