import { ValidationPipe } from '@nestjs/common'
import { NestApplication, NestFactory } from '@nestjs/core'
import { join } from 'path'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(
    AppModule,
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
    ],
    credentials: true,
  })

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  })

  await app.listen(3001)
}
bootstrap()
