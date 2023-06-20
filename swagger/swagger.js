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
    './schemas/book-service.schema.yaml',
    './schemas/order-service.schema.yaml',
    './schemas/user-service.schema.yaml',
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.get('/api-docs/healthz', (req, res, next) => {
  res.send('Swagger\'s health is OK')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3003, () => {
  console.log('Swagger server started');
});
