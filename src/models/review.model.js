const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Compound index to ensure one review per user per book
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Update book's average rating when a review is created or updated
reviewSchema.post('save', async function() {
  const Book = mongoose.model('Book');
  const book = await Book.findById(this.book);
  
  const reviews = await this.constructor.find({ book: this.book });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  
  book.averageRating = totalRating / reviews.length;
  book.totalReviews = reviews.length;
  await book.save();
});

// Update book's average rating when a review is deleted
reviewSchema.post('remove', async function() {
  const Book = mongoose.model('Book');
  const book = await Book.findById(this.book);
  
  const reviews = await this.constructor.find({ book: this.book });
  if (reviews.length === 0) {
    book.averageRating = 0;
    book.totalReviews = 0;
  } else {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = totalRating / reviews.length;
    book.totalReviews = reviews.length;
  }
  await book.save();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 