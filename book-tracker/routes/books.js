const express = require('express');
const router = express.Router();

// Import your controller functions
const {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/books');

// =============== Swagger: Book Routes ===============

// GET /books - Get all books
router.get(
  '/',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Get all books' */
  listBooks
);

// GET /books/{id} - Get single book by ID
router.get(
  '/:id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Get a single book by ID' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        description: 'MongoDB ObjectId of the book'
  } */
  getBook
);

// POST /books - Create a new book
router.post(
  '/',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Create a new book' */
  /* #swagger.parameters['book'] = {
        in: 'body',
        required: true,
        description: 'Book object that needs to be added',
        schema: { $ref: '#/definitions/BookCreate' }
  } */
  createBook
);

// PUT /books/{id} - Update an existing book
router.put(
  '/:id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Update an existing book' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        description: 'MongoDB ObjectId of the book to update'
  } */
  /* #swagger.parameters['book'] = {
        in: 'body',
        required: true,
        description: 'Updated book fields',
        schema: { $ref: '#/definitions/BookUpdate' }
  } */
  updateBook
);

// DELETE /books/{id} - Delete a book
router.delete(
  '/:id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Delete a book by ID' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string',
        description: 'MongoDB ObjectId of the book to delete'
  } */
  deleteBook
);

module.exports = router;
