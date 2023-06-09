import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as express from 'express';
import * as path from 'path';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Express buddy')
    .setDescription('Express buddy API description')
    .setVersion('1.0')
    .addTag('express-buddy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.enableCors();
  app.use(helmet());

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerPartials(join(__dirname, '..', 'views/layout'));
  hbs.registerPartials(join(__dirname, '..', 'views/components'));
  hbs.registerPartials(join(__dirname, '..', 'views/includes'));
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: ConfigService.keys.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerPartials(join(__dirname, '..', 'views/layout'));
  hbs.registerPartials(join(__dirname, '..', 'views/components'));
  hbs.registerPartials(join(__dirname, '..', 'views/includes'));

  app.setViewEngine('hbs');
  await app.listen(ConfigService.keys.PORT);
}
bootstrap();
