const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req,res,next)=>{
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({ message: 'Unauthorized' });
  const token = header.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  }catch(err){ res.status(401).json({ message: 'Unauthorized' }); }
};

exports.admin = (req,res,next)=>{
  if(req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden' });
};
