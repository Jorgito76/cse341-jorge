const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

//  GET all books
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 */
router.get('/books', booksController.getAll);

//  GET by ID
router.get('/books/:id', booksController.getSingle);

//  POST new book
/**
 * @swagger
 * /books:
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
 *           required:
 *             - title
 *             - author
 *             - genre
 *             - status
 *             - rating
 *             - notes
 *           properties:
 *             title:
 *               type: string
 *               example: The Pragmatic Programmer
 *             author:
 *               type: string
 *               example: Andrew Hunt
 *             genre:
 *               type: string
 *               example: Software Engineering
 *             status:
 *               type: string
 *               example: reading
 *             rating:
 *               type: integer
 *               example: 5
 *             notes:
 *               type: string
 *               example: Fantastic read for developers.
 */
router.post('/books', booksController.createBook);

//  PUT update book
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ID of the book to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: book
 *         description: Updated book data
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: Updated Title
 *             status:
 *               type: string
 *               example: completed
 *             rating:
 *               type: integer
 *               example: 4
 */
router.put('/books/:id', booksController.updateBook);

//  DELETE
router.delete('/books/:id', booksController.deleteBook);

module.exports = router;
