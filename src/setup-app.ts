import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const cookieSession = require('cookie-session');

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


  // ***** Cookie Session *****
  app.use(cookieSession({keys: ["KeyFromEnvFile"]}));

  // ***** Enable Cors *****
  app.enableCors({
    origin: ['http://localhost:4000','http://localhost:3000', 'https://inventory.aranabdi.ir'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  })
  
}