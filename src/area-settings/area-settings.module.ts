import { Module } from '@nestjs/common';
import { AreaSettingsService } from './area-settings.service';
import { AreaSettingsController } from './area-settings.controller';

@Module({
  controllers: [AreaSettingsController],
  providers: [AreaSettingsService],
  exports: [AreaSettingsService],
})
export class AreaSettingsModule {}
