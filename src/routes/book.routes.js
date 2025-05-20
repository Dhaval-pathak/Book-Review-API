const express = require('express');
const { body } = require('express-validator');
const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Validation middleware
const validateBook = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('genre').trim().notEmpty().withMessage('Genre is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
];

// Routes
router.post('/', auth, validateBook, bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

module.exports = router; 