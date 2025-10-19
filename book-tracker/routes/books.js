// book-tracker/routes/books.js
const express = require('express');
const router = express.Router();
const {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/books');

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *   post:
 *     summary: Create a new book
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: book
 *         description: The book to create
 *         schema:
 *           type: object
 *           required: [title, author, genre, status]
 *           properties:
 *             title:   { type: string, example: "Atomic Habits" }
 *             author:  { type: string, example: "James Clear" }
 *             genre:   { type: string, example: "Self-Improvement" }
 *             status:  { type: string, example: "reading" }
 *             rating:  { type: integer, example: 5 }
 *             notes:   { type: string, example: "Great chapter on habit stacking." }
 *
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *   put:
 *     summary: Update a book by ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: body
 *         name: book
 *         description: Updated book fields
 *         schema:
 *           type: object
 *           properties:
 *             title:   { type: string, example: "Atomic Habits" }
 *             author:  { type: string, example: "James Clear" }
 *             genre:   { type: string, example: "Self-Improvement" }
 *             status:  { type: string, example: "completed" }
 *             rating:  { type: integer, example: 4 }
 *             notes:   { type: string, example: "Finished—very actionable." }
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */

// IMPORTANT: because this router is mounted at '/books' in routes/index.js,
// the path here should be '/' and '/:id'
router.get('/', listBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
