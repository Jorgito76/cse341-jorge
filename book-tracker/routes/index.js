const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => res.send('Book Tracker API is up'));
router.use('/books', require('./books'));

module.exports = router;
