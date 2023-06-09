import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AreaSettingsService } from './area-settings.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('area-settings')
@UseGuards(JwtAuthGuard)
export class AreaSettingsController {
  constructor(private readonly areaSettingsService: AreaSettingsService) {}

  @Get('pricing')
  getPricing() {
    return this.areaSettingsService.getPricing();
  }
}
