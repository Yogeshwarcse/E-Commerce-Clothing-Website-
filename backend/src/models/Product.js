const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  sku: String,
  size: String,
  color: String,
  price: Number,
  stock: Number
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: String,
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  variants: [VariantSchema],
  price: Number,
  slug: { type: String, index: true }
}, { timestamps: true });

ProductSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
