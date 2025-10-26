const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connection');
const { bookSchema } = require('../validation/book.schema');
const asyncHandler = require('../utils/asyncHandler');

//  GET /books 
const listBooks = asyncHandler(async (req, res) => {
  const books = await getDb().collection('books').find().toArray();
  res.status(200).json(books);
});

//  GET /books/:id 
const getBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) throw { status: 400, message: 'Invalid id' };
  const doc = await getDb().collection('books').findOne({ _id: new ObjectId(id) });
  if (!doc) throw { status: 404, message: 'Book not found' };
  res.status(200).json(doc);
});

//  POST /books 
const createBook = asyncHandler(async (req, res) => {
  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) throw { status: 400, message: 'Validation failed', details: parsed.error.flatten() };
  const result = await getDb().collection('books').insertOne(parsed.data);
  res.status(201).json({ id: result.insertedId });
});

//  PUT /books/:id 
const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) throw { status: 400, message: 'Invalid id' };
  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) throw { status: 400, message: 'Validation failed', details: parsed.error.flatten() };

  const result = await getDb().collection('books')
    .updateOne({ _id: new ObjectId(id) }, { $set: parsed.data });

  if (result.matchedCount === 0) throw { status: 404, message: 'Book not found' };
  res.status(204).send();
});

//  DELETE /books/:id 
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) throw { status: 400, message: 'Invalid id' };
  const result = await getDb().collection('books').deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) throw { status: 404, message: 'Book not found' };
  res.status(200).json({ deleted: true });
});

module.exports = {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};

