import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { ManagementModule } from './Mangement/management.module';
async function bootstrap() {
  const app = await NestFactory.create(ManagementModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Update this with the origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(8080);
}
bootstrap();
