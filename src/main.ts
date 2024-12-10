import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
  .setTitle('Serviço de Rotas')
  // .setDescription('Voyager Documentation -  Azure CI/CD')
  .setVersion('1.7.8')
  .addTag('default')
  .setExternalDoc("Obter token microsoft","https://developer.microsoft.com/en-us/graph/graph-explorer" )
  .addServer(`http://localhost:${process.env.PORT}`) 
  // .addServer('/voyager/api')
  // .addServer('http://10.21.33.50:2023')
  .build();

const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT);
  console.log(`Servidor rodando na porta: ${process.env.PORT}`)
}
bootstrap();
