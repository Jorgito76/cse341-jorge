// server.js
const express = require('express');
const { initDb } = require('./db/connect');

const app = express();

// Accept standard JSON plus "+json" types some clients/proxies send
app.use(express.json({ type: ['application/json', 'application/*+json', 'text/json'], limit: '1mb', strict: true }));

// If JSON parsing fails, return a clear JSON error instead of HTML "Bad Request"
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON', details: err.message });
  }
  // Express 5 uses body-parser under the hood; also catch generic SyntaxError with a body
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON', details: err.message });
  }
  return next(err);
});

app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

initDb((err) => { // connects using process.env.MONGODB_URI :contentReference[oaicite:2]{index=2}
  if (err) {
    console.error(err);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // was a template string fix earlier :contentReference[oaicite:3]{index=3}
  });
});
