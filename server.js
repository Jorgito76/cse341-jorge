// server.js
const express = require('express');
const { initDb } = require('./db/connect');

const app = express();
app.use(express.json());
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

initDb(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
