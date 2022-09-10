import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const listenPort = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(listenPort);
  console.log(`listennig to http://localhost:${listenPort}`);
}
bootstrap();
