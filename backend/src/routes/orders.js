const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, admin } = require('../middlewares/auth');

router.get('/', auth, async (req,res)=>{
  if(req.user.role==='admin'){ const items = await Order.find().populate('user'); return res.json(items); }
  const items = await Order.find({ user: req.user.id });
  res.json(items);
});

router.post('/', auth, async (req,res)=>{
  const order = await Order.create({ user: req.user.id, ...req.body });
  res.status(201).json(order);
});

router.put('/:id', auth, admin, async (req,res)=>{ const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(order); });

module.exports = router;
