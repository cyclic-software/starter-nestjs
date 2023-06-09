import { PartialType } from '@nestjs/swagger';
import { CreatePromotionalDto } from './create-promotional.dto';

export class UpdatePromotionalDto extends PartialType(CreatePromotionalDto) {}
