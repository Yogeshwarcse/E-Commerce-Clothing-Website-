const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discount: Number,
  expiry: Date
});

module.exports = mongoose.model('Coupon', CouponSchema);
