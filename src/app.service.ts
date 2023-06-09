import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 5 jun 2023 - 11:41 AM';
  }
}
