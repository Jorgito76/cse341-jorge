const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { connectDB } = require('./db/connection');

require('dotenv').config();

const app = express();

//  Enable CORS for all requests
app.use(cors({
  origin: ['https://cse341-jorge.onrender.com', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//  Database connection
connectDB();

//  Base route
app.get('/', (req, res) => {
  res.send('Book Tracker API is up');
});

//  Routes
app.use('/', require('./routes'));

//  Port listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
