import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupApp = (app: any) => {

  // ***** Swagger Configurations *****
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('The inventory API description')
    .setVersion('1.0')
    .addTag('Inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);


  // ***** Validation Pipe *****
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

}