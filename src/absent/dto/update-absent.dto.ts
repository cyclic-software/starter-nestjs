import { PartialType } from '@nestjs/mapped-types';
import { CreateAbsentDto } from './create-absent.dto';

export class UpdateAbsentDto extends PartialType(CreateAbsentDto) {}
