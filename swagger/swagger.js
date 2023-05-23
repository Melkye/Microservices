const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookshop Microservices API',
      version: '1.0.0',
    },
  },
  apis: [
    './schemas/auth-service.schema.yaml',
    './schemas/user-service.schema.yaml',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3003, () => {
  console.log('Swagger server started on http://localhost:3000/api');
});
