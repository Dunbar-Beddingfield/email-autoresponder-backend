import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const webAppUrl = config.get<string>('WEB_APP_URL');
  app.enableCors({ origin: webAppUrl ?? true, credentials: true });

  const port = config.get<number>('PORT') ?? 3001;
  await app.listen(port);
}

void bootstrap();
