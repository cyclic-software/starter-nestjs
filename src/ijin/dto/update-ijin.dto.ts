import { PartialType } from '@nestjs/mapped-types';
import { CreateIjinDto } from './create-ijin.dto';

export class UpdateIjinDto extends PartialType(CreateIjinDto) {}
