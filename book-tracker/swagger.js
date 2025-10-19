// book-tracker/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Tracker API',
    description: 'API documentation for the Book Tracker project',
    version: '1.0.0'
  },

  host: 'cse341-jorge.onrender.com',
  schemes: ['https'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Books', description: 'Book resources' }
  ]
};


const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
