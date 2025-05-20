const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Validation middleware
const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required')
];

// Routes
router.post('/books/:bookId/reviews', auth, validateReview, reviewController.createReview);
router.put('/:id', auth, validateReview, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router; 