// routes/contacts.js
const { Router } = require('express');
const {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contacts');

const router = Router();

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
