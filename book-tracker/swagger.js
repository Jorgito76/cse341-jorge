const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Tracker API',
    description: 'API documentation for the Book Tracker project',
    version: '1.0.0',
  },
  servers: [
    { url: 'https://cse341-jorge.onrender.com', description: 'Render' },
    { url: 'http://localhost:3001', description: 'Local' }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
