const mongoose = require('mongoose');

const CartItem = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variant: Object,
  quantity: Number
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [CartItem]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
