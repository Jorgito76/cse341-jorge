// book-tracker/server.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { connect } = require('./db/connection'); // ✅ use connect (not connectDB)
require('dotenv').config();

const app = express();

// CORS (allow local + Render)
app.use(cors({
  origin: ['https://cse341-jorge.onrender.com', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Health check
app.get('/', (req, res) => {
  res.send('Book Tracker API is up');
});

// Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Missing MONGODB_URI');
    await connect(uri); // ✅ connect to Mongo before listening
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
