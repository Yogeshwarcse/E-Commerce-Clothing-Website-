const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { auth } = require('../middlewares/auth');

router.get('/', auth, async (req,res)=>{ const cart = await Cart.findOne({ user: req.user.id }) || { items: [] }; res.json(cart); });
router.post('/', auth, async (req,res)=>{ const { items } = req.body; let cart = await Cart.findOne({ user: req.user.id }); if(!cart) cart = await Cart.create({ user: req.user.id, items }); else { cart.items = items; await cart.save(); } res.json(cart); });
router.put('/', auth, async (req,res)=>{ const { items } = req.body; const cart = await Cart.findOneAndUpdate({ user: req.user.id }, { items }, { new: true, upsert: true }); res.json(cart); });
router.delete('/:productId', auth, async (req,res)=>{ const cart = await Cart.findOne({ user: req.user.id }); if(!cart) return res.status(404).end(); cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId); await cart.save(); res.json(cart); });

module.exports = router;
