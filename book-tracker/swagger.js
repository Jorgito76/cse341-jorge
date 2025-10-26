const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book Tracker API',
    description: 'API documentation for the Book Tracker project',
    version: '1.0.0'
  },
  host: 'cse341-jorge.onrender.com',
  schemes: ['https', 'http'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [{ name: 'Books', description: 'Book resources' }],

  definitions: {
    BookCreate: {
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      genre: 'Software',
      isbn: '978-0134494166',
      status: 'planned',
      rating: 5,
      startedAt: '2025-10-01',
      finishedAt: null,
      notes: 'To read soon'
    },
    BookUpdate: {
      title: 'Clean Architecture (2nd Edition)',
      author: 'Robert C. Martin',
      genre: 'Software',
      status: 'reading',
      rating: 5
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
