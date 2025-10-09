// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API documentation for the Contacts project',
    },
    servers: [
      {
        url: 'https://cse341-jorge.onrender.com',
        description: 'Render live server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development server'
      }
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = { swaggerDocs };
