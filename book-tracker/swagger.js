const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Tracker API',
      version: '1.0.0',
      description: 'API documentation for the Book Tracker Project (Week 5)'
    },
    servers: [
      { url: 'https://book-tracker-jorge.onrender.com', description: 'Render' },
      { url: 'http://localhost:3001', description: 'Local' }
    ]
  },
  apis: ['./routes/*.js']
};

const spec = swaggerJSDoc(options);

function mountSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}

module.exports = { mountSwagger };
