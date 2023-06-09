import { Injectable } from '@nestjs/common';
import { Keys } from './keys';

@Injectable()
export class ConfigService {
  static keys: Keys = new Keys();
}
