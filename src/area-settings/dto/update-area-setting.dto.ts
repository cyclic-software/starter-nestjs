import { PartialType } from '@nestjs/swagger';
import { CreateAreaSettingDto } from './create-area-setting.dto';

export class UpdateAreaSettingDto extends PartialType(CreateAreaSettingDto) {}
