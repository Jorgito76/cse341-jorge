const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connection');
const { bookSchema } = require('../validation/book.schema');

// GET /books
async function listBooks(req, res) {
  const books = await getDb().collection('books').find().toArray();
  res.status(200).json(books);
}

// GET /books/:id
async function getBook(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
  const doc = await getDb().collection('books').findOne({ _id: new ObjectId(id) });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(doc);
}

// POST /books
async function createBook(req, res) {
  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const result = await getDb().collection('books').insertOne(parsed.data);
  res.status(201).json({ id: result.insertedId });
}

// PUT /books/:id
async function updateBook(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const result = await getDb().collection('books')
    .updateOne({ _id: new ObjectId(id) }, { $set: parsed.data });

  if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
  return res.status(204).send();
}

// DELETE /books/:id
async function deleteBook(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
  const result = await getDb().collection('books').deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
  res.status(200).json({ deleted: true });
}

// book-tracker/controllers/books.js
module.exports = {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};

