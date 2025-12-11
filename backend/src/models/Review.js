const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
