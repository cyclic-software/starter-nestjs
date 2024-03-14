import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: ["http://nrex-league.x10.mx"],
    methods: ["GET", "POST"],
    credentials: true
    
  });
  app.enableCors()
  const port = process.env.SERVER_PORT
  await app.listen(port);

}
bootstrap();
