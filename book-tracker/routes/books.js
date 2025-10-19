const { Router } = require('express');
const {
  listBooks, getBook, createBook, updateBook, deleteBook
} = require('../controllers/books');

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Book:
 *       type: object
 *       required: [title, author, genre, status]
 *       properties:
 *         _id: { type: string, description: Auto-generated ID }
 *         title: { type: string }
 *         author: { type: string }
 *         isbn: { type: string }
 *         genre: { type: string }
 *         status: { type: string, enum: [planned, reading, finished] }
 *         rating: { type: integer, minimum: 1, maximum: 5 }
 *         startedAt: { type: string }
 *         finishedAt: { type: string }
 *         notes: { type: string }
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: List all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Array of books
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Book' }
 *     responses:
 *       201:
 *         description: Created with new id
 *
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Found }
 *       404: { description: Not found }
 *   put:
 *     summary: Update a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Book' }
 *     responses:
 *       204: { description: Updated }
 *       404: { description: Not found }
 *   delete:
 *     summary: Delete a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 */

router.get('/', listBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
