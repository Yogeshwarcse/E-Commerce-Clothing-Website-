const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { auth, admin } = require('../middlewares/auth');

router.get('/', async (req,res)=>{ const cats = await Category.find(); res.json(cats); });
router.post('/', auth, admin, async (req,res)=>{ const c = await Category.create(req.body); res.status(201).json(c); });
router.put('/:id', auth, admin, async (req,res)=>{ const c = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(c); });
router.delete('/:id', auth, admin, async (req,res)=>{ await Category.findByIdAndDelete(req.params.id); res.status(204).end(); });

module.exports = router;
