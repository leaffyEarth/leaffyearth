import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LeafyEarth API')
    .setDescription('API documentation for LeafyEarth Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-structure', app, document);

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.ADMIN_CONSOLE_URL,
        process.env.MARKETPLACE_URL,
        'http://localhost:3000',
        'http://localhost:5000',
        'http://localhost:8000',
        'http://localhost:3001',
        'https://portal.leaffyearth.com',
        'https://leaffyearth.com',
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
