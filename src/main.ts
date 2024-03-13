import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: ["http://nrex-league.x10.mx"],
    methods: ["GET", "POST"],
    credentials: true
    
  });
  app.enableCors()
  const configService = app.get(ConfigService);
  const port = configService.get<number>(SERVER_PORT);
  await app.listen(port);

}
bootstrap();
