const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./db/connection');
const { mountSwagger } = require('./swagger');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mountSwagger(app);
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Missing MONGODB_URI');
    await connect(uri);
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
