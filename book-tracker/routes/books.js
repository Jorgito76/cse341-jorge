const express = require('express');
const router = express.Router();

const {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/books');

/* =========================================================
   Books Routes (Swagger-autogen annotations)
   ========================================================= */

// GET /books - Get all books
router.get(
  '/',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Get all books' */
  /* #swagger.responses[200] = {
        description: 'Array of books',
        schema: [{ 
          _id: '68e1701a017b73509b11b427',
          title: 'The Pragmatic Programmer',
          author: 'Andrew Hunt, David Thomas',
          isbn: '978-0201616224',
          genre: 'Software',
          status: 'finished',
          rating: 5,
          startedAt: '2024-09-01',
          finishedAt: '2024-09-20',
          notes: 'Classic.'
        }]
  } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  listBooks
);

// GET /books/{id} - Get single book by ID
router.get(
  '/:id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Get a single book by ID' */
  /* #swagger.parameters['id'] = {
        in: 'path', required: true, type: 'string',
        description: 'MongoDB ObjectId of the book'
  } */
  /* #swagger.responses[200] = { description: 'Book found' } */
  /* #swagger.responses[400] = { description: 'Invalid id' } */
  /* #swagger.responses[404] = { description: 'Book not found' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  getBook
);

// POST /books - Create a new book
router.post(
  '/',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Create a new book' */
  /* 
    Expected body aligns with Zod schema (title, author, genre required; others optional):contentReference[oaicite:3]{index=3}.
  */
  /* #swagger.parameters['book'] = {
        in: 'body', required: true,
        description: 'Book to create',
        schema: {
          $ref: '#/definitions/BookCreate'
          // If you prefer inline example instead of $ref, you can use:
          // title: 'Clean Architecture', author: 'Robert C. Martin', genre: 'Software',
          // isbn: '978-0134494166', status: 'planned', rating: 4,
          // startedAt: '2025-10-01', finishedAt: null, notes: 'To read next'
        }
  } */
  /* #swagger.responses[201] = {
        description: 'Created',
        schema: { id: '68e1701a017b73509b11b427' }
  } */
  /* #swagger.responses[400] = { description: 'Validation failed' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  createBook
);

// PUT /books/{id} - Update an existing book
router.put(
  '/:id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Update an existing book' */
  /* #swagger.parameters['id'] = {
        in: 'path', required: true, type: 'string',
        description: 'MongoDB ObjectId of the book to update'
  } */
  /* #swagger.parameters['book'] = {
        in: 'body', required: true,
        description: 'Updated book fields (must satisfy schema)',
        schema: { $ref: '#/definitions/BookUpdate' }
  } */
  /* #swagger.responses[204] = { description: 'Updated successfully (no content)' } */
  /* #swagger.responses[400] = { description: 'Invalid id or validation failed' } */
  /* #swagger.responses[404] = { description: 'Book not found' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  updateBook
);

// DELETE /books/{id} - Delete a book
router.delete(
  '/:id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Delete a book by ID' */
  /* #swagger.parameters['id'] = {
        in: 'path', required: true, type: 'string',
        description: 'MongoDB ObjectId of the book to delete'
  } */
  /* #swagger.responses[200] = { description: 'Deleted', schema: { deleted: true } } */
  /* #swagger.responses[400] = { description: 'Invalid id' } */
  /* #swagger.responses[404] = { description: 'Book not found' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  deleteBook
);

module.exports = router;
