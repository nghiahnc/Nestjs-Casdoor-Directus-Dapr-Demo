import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ QUAN TRỌNG
app.use(express.json({ type: ['application/json', 'application/*+json'] }));

  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
