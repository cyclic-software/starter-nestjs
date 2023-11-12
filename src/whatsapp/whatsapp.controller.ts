import { Controller } from '@nestjs/common';
import { initClient } from 'messagebird';
const messagebird = initClient(process.env.MESSAGE_BIRD);

@Controller('whatsapp')
export class WhatsappController {}
