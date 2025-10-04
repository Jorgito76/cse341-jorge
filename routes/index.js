// routes/index.js
const { Router } = require('express');
const contacts = require('./contacts');

const router = Router();
router.get('/', (req, res) => res.send('API is up'));
router.use('/contacts', contacts);

module.exports = router;