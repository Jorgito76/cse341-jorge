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
  tags: [{ name: 'Books', description: 'Book resources' }],

  definitions: {
    BookCreate: {
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Improvement',
      status: 'reading',
      rating: 5,
      notes: 'Excellent guide on building better habits.'
    },
    BookUpdate: {
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Improvement',
      status: 'completed',
      rating: 4,
      notes: 'Finished reading — very useful.'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
