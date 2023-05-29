import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupApp = (app: any) => {
    const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('The inventory API description')
    .setVersion('1.0')
    .addTag('Inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
}