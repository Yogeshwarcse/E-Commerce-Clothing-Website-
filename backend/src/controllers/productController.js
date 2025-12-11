const Product = require('../models/Product');

exports.list = async (req,res,next)=>{
  try{
    const { page=1, limit=12, q, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if(q) filter.$text = { $search: q };
    if(category) filter.category = category;
    if(minPrice || maxPrice) filter.price = {};
    if(minPrice) filter.price.$gte = Number(minPrice);
    if(maxPrice) filter.price.$lte = Number(maxPrice);
    const skip = (page-1)*limit;
    const items = await Product.find(filter).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ items, total });
  }catch(err){next(err)}
};

exports.get = async (req,res,next)=>{
  try{ const p = await Product.findById(req.params.id); res.json(p);}catch(err){next(err)}
};

exports.create = async (req,res,next)=>{
  try{ const p = await Product.create(req.body); res.status(201).json(p);}catch(err){next(err)}
};

exports.update = async (req,res,next)=>{
  try{ const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(p);}catch(err){next(err)}
};

exports.remove = async (req,res,next)=>{
  try{ await Product.findByIdAndDelete(req.params.id); res.status(204).end(); }catch(err){next(err)}
};
