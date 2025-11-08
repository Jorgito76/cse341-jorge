// book-tracker/server.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { connect } = require('./db/connection'); 
const { auth, requiresAuth } = require('express-openid-connect');
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

// ===== Auth0 (express-openid-connect) =====
app.use(auth({
  authRequired: false,            // GETs stay public; writes can be protected in routes
  auth0Logout: true,              // /logout redirects via Auth0
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,  // http://localhost:3001 
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}));

// Quick auth probes
app.get('/auth-status', (req, res) => {
  res.json({ authenticated: !!req.oidc?.isAuthenticated(), user: req.oidc?.user || null });
});
app.get('/profile', requiresAuth(), (req, res) => {
  res.json({ authenticated: true, user: req.oidc.user });
});

// Routes
app.use('/', require('./routes'));

//  404 for unknown routes 
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//  Global Error Handler 
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// Start server
const PORT = process.env.PORT || 3001;
(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Missing MONGODB_URI');
    await connect(uri);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
