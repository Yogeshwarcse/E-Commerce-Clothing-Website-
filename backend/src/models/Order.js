const mongoose = require('mongoose');

const OrderItem = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variant: Object,
  quantity: Number,
  price: Number
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [OrderItem],
  amount: Number,
  paymentStatus: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  shippingAddress: Object
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
